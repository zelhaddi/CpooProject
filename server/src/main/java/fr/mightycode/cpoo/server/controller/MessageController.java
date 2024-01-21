package fr.mightycode.cpoo.server.controller;

import fr.mightycode.cpoo.server.dto.MessageDTO;
import fr.mightycode.cpoo.server.dto.MessageReaction;
import fr.mightycode.cpoo.server.dto.NewMessageDTO;
import fr.mightycode.cpoo.server.dto.UserProfileDTO;
import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.CustomUser;
import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.repository.ConversationRepository;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import fr.mightycode.cpoo.server.repository.MessageRepository;
import fr.mightycode.cpoo.server.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("message")
@RequiredArgsConstructor
public class MessageController {

  @Value("${cpoo.server.domain}")
  private String serverDomain;

  private final RouterService routerService;
  private final ConversationRepository conversationRepository;
  private final MessageRepository messageRepository;
  public final ConversationService conversationService;
  private final MessageService messageService;
  private final CustomUserRepository customUserRepository;
  private final SSeService sseService;
  private final UserService userService;

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<MessageDTO> messagePost( String user, @RequestBody final NewMessageDTO postMessage) {
    String toDomain = postMessage.toDomain();
    String toUsername = postMessage.to();
    if(toDomain.equals(serverDomain)){
      if(customUserRepository.existsByUsername(toUsername) == false){
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user with this username");
      }
    }
    user = userService.getUsername();
    if(customUserRepository.existsByUsername(postMessage.to()) == false){
      userService.signup(postMessage.to(), "pwd", postMessage.toDomain(), "Outside My APpplication", false);
    }

    UUID uuid = UUID.randomUUID();
    long time = System.currentTimeMillis();
    // Build a router message from the DTO
    RouterService.Message routerMessage = new RouterService.Message(
      uuid,
      time,
      user + "@" + customUserRepository.findByUsername(user).getDomain(),
      postMessage.to() + "@" + postMessage.toDomain(),
      postMessage.type(),
      postMessage.body(),
            postMessage.toDomain()
    );

    if(!postMessage.toDomain().equals(serverDomain)) {

      //store this message on my database
      if (conversationRepository.findConversationByUsername1AndUsername2(user, postMessage.to()) == null && conversationRepository.findConversationByUsername1AndUsername2(postMessage.to(), user) == null) {
        Conversation conversationToAddToMyDatabase = new Conversation();
        conversationToAddToMyDatabase.setMessages(new ArrayList<>());
        conversationToAddToMyDatabase.setUsername1(user);
        conversationToAddToMyDatabase.setUsername2(postMessage.to());
        conversationRepository.save(conversationToAddToMyDatabase);
      }

      Conversation conversation = new Conversation();

      if (conversationRepository.findConversationByUsername1AndUsername2(user, postMessage.to()) != null) {
        conversation = conversationRepository.findConversationByUsername1AndUsername2(user, postMessage.to());
        Message messagetoStore = new Message();
        messagetoStore.setTimestamp(time);
        messagetoStore.setFrom(user);
        messagetoStore.setTo(postMessage.to());
        messagetoStore.setType(postMessage.type());
        messagetoStore.setBody(postMessage.body());
        messagetoStore.setToDomain(postMessage.toDomain());
        // Save the message to the database
        // Assuming you have a MessageRepository, call its save method.
        messageRepository.save(messagetoStore);
        conversation.getMessages().add(messagetoStore);
      } else if (conversationRepository.findConversationByUsername1AndUsername2(postMessage.to(), user) != null) {
        conversation = conversationRepository.findConversationByUsername1AndUsername2(postMessage.to(), user);
        Message messagetoStore = new Message();
        messagetoStore.setTimestamp(time);
        messagetoStore.setFrom(user);
        messagetoStore.setTo(postMessage.to());
        messagetoStore.setType(postMessage.type());
        messagetoStore.setBody(postMessage.body());
        messagetoStore.setToDomain(postMessage.toDomain());
        // Save the message to the database
        // Assuming you have a MessageRepository, call its save method.
        messageRepository.save(messagetoStore);
        conversation.getMessages().add(messagetoStore);
      }

      conversation.setSeen(false);
      conversationRepository.save(conversation);

      // Send SSE event
      sseService.sendEventToSubscribers(new Message(routerMessage));
    }


    // Route the message
    routerService.routeMessage(routerMessage);

    // Return the message as a DTO
    return ResponseEntity.ok(new MessageDTO(routerMessage));
  }

  @PostMapping(path = "getAllMessagesOfConversation", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<Message>> getAllMessageOfConversation(@RequestBody UserProfileDTO loginOtherUser) {
    List<Message> messages = messageService.getAllMessageOfConversation(loginOtherUser.login());
    if(messages == null){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no conversation between these 2 users");
    }
    else{
      return ResponseEntity.ok(messages);
    }
  }

  @PostMapping(path = "getLastMessagesOfConversation", consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Message> getLastMessageOfConversation(@RequestBody UserProfileDTO loginOtherUser) {
    Message message = messageService.getLastMessageOfConversation(loginOtherUser.login());
    if(message == null){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no conversation between these 2 users");
    }
    else{
      return ResponseEntity.ok(message);
    }
  }

    @PostMapping(path = "addReactionToMessage", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MessageReaction> addReactionToMessage(@RequestBody MessageReaction messageReaction) {
      System.out.println("voici le message : " + messageReaction.id() + " " + messageReaction.type());
        try {
          MessageReaction messageWithReaction = messageService.addReactionToMessage(messageReaction);
          if (messageWithReaction == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no message with this id");
          } else {
            return ResponseEntity.ok(messageWithReaction);
          }
        }catch (RuntimeException e){
          throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No reaction between users outside my application");
        }
    }

    @DeleteMapping(path = "deleteMessage/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity deleteMessage(@PathVariable UUID id) {
        int idResponse = messageService.deleteMessage(id);
        if(idResponse == 0){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged");
        }
        if(idResponse == 1){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no message with this id");
        }
        if (idResponse == 3){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not the sender of this message");
        }
        else{
            return ResponseEntity.ok().build();
        }
    }




}
