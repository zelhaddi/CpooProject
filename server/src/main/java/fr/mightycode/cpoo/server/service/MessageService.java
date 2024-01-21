package fr.mightycode.cpoo.server.service;

import fr.mightycode.cpoo.server.dto.MessageDTO;
import fr.mightycode.cpoo.server.dto.MessageReaction;
import fr.mightycode.cpoo.server.dto.NewMessageDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.CustomUser;
import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.repository.ConversationRepository;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import fr.mightycode.cpoo.server.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MessageService {

  @Value("${cpoo.server.domain}")
  private String serverDomain;
  private final MessageRepository messageRepository;
  private final ConversationRepository conversationRepository;
  private final CustomUserRepository customUserRepository;
  private final SendMessageService sendMessageService;
    private final SSeService sseService;


  /**
   * Store a message in the DB.
   *
   * @param message The message to store
   */
  //Methode utilise quand je recois un message hors mon application
  public void storeMessage(Message message) {
    sendMessageService.sendMessage(message);
  }

  /**
   * Get all messages send to or by a given user.
   *
   * @param login The user login
   * @return the list of messages sent to or by the user
   */
  public List<Message> getMessages(String login) {
    String userAddress = login + "@" + serverDomain;
    return messageRepository.findByFromOrToIgnoreCaseOrderByTimestampDesc(userAddress, userAddress);
  }

  public List<Message> getAllMessageOfConversation(String loginOtherUser) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails) {
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    } else {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) == null && conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) == null) {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) != null) {
      conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser).setSeen(true);
      conversationRepository.save(conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser));
      return conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser).getMessages();
    } else if (conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) != null) {
      conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser).setSeen(true);
      conversationRepository.save(conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser));
      return conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser).getMessages();
    }
    return null;
  }

  public Message getLastMessageOfConversation(String loginOtherUser) {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails) {
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    } else {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) == null && conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) == null) {
      return null;
    }
    if (conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser) != null) {
      List<Message> messages = conversationRepository.findConversationByUsername1AndUsername2(usernameCurentUser, loginOtherUser).getMessages();
      return messages.get(messages.size()-1);
    } else if (conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser) != null) {
      List<Message> messages = conversationRepository.findConversationByUsername1AndUsername2(loginOtherUser, usernameCurentUser).getMessages();
      return messages.get(messages.size()-1);
    }
    return null;
  }

  public MessageReaction addReactionToMessage(MessageReaction messageReaction){
    Message message = messageRepository.findById(messageReaction.id()).orElse(null);
    System.out.println("chuf hna : " + message.getBody());
    boolean isOneUserOutMyApp = false;

    String userFrom = message.getFrom();
    String userTo = message.getTo();

    CustomUser userFromObject = customUserRepository.findByUsername(userFrom);
    System.out.println("userFromObject : " + userFromObject.getDomain());
    if(!userFromObject.getDomain().equals(serverDomain)){
      isOneUserOutMyApp = true;
    }


    CustomUser userToObject = customUserRepository.findByUsername(userTo);
    System.out.println("userToObject : " + userToObject.getDomain() );
    if(!userToObject.getDomain().equals(serverDomain)){
      isOneUserOutMyApp = true;
    }

    System.out.println("isOneUserOutMyApp : " + isOneUserOutMyApp);

    if(isOneUserOutMyApp){
      throw new RuntimeException("Not implemented yet");
    }

    if (message == null) {
      return null;
    }
    if(!isOneUserOutMyApp){
      String currentType = message.getType();
      if (currentType.equals(messageReaction.type())) {
        message.setType("");
      } else {
        message.setType(messageReaction.type());
      }
      messageRepository.save(message);
      sseService.sendReactionToSubscribers(message);
      return messageReaction;
    }
    else{
      //On considère que les message echangé a travers notre appli
    }
    return null;
  }

  public int deleteMessage(UUID id){
    //getCurrentUser
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String usernameCurentUser = new String();

    if (principal instanceof UserDetails) {
      CustomUser customUser = customUserRepository.findByUsername(((UserDetails) principal).getUsername());
      usernameCurentUser = customUser.getUsername();
    } else {
      return 0;
    }

    Message messageToDelete = messageRepository.findById(id).orElse(null);
    if(messageToDelete == null){
      return 1;
    }
    else{
      if(messageToDelete.getFrom().equals(usernameCurentUser)){
        //get the conversation of this message
        Conversation conversation = conversationRepository.findConversationByUsername1AndUsername2(messageToDelete.getFrom(), messageToDelete.getTo());
        if (conversation == null) {
          conversation = conversationRepository.findConversationByUsername1AndUsername2(messageToDelete.getTo(), messageToDelete.getFrom());
        }
        //remove the message from the conversation
        conversation.getMessages().remove(messageToDelete);
        //save the conversation
        conversationRepository.save(conversation);
        //delete the message
        messageRepository.delete(messageToDelete);
        return 2;
      }
      else{
        return 3;
      }
    }
  }

}
