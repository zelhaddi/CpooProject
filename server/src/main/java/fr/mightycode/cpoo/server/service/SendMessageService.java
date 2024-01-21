package fr.mightycode.cpoo.server.service;

import fr.mightycode.cpoo.server.model.Conversation;
import fr.mightycode.cpoo.server.model.CustomUser;
import fr.mightycode.cpoo.server.model.Message;
import fr.mightycode.cpoo.server.repository.ConversationRepository;
import fr.mightycode.cpoo.server.repository.CustomUserRepository;
import fr.mightycode.cpoo.server.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class SendMessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final SSeService sseService;
    private final CustomUserRepository customUserRepository;
    private final PasswordEncoder passwordEncoder;

    public void sendMessage(Message message) {

        Message messageToStore = new Message();
        messageToStore.setTimestamp(message.getTimestamp());
        messageToStore.setFrom(message.getFrom().split("@")[0]);
        messageToStore.setTo(message.getTo().split("@")[0]);
        messageToStore.setType(message.getType());
        messageToStore.setBody(message.getBody());
        messageToStore.setToDomain(message.getTo().split("@")[1]);
        System.out.println("ha lmessage li aytstorah : " + messageToStore.getBody() + " " + messageToStore.getFrom() + " " + messageToStore.getTo() + " " + messageToStore.getTimestamp() + " " + messageToStore.getType() + " " + messageToStore.getToDomain());

        if(customUserRepository.existsByUsername(messageToStore.getFrom()) == false){
            System.out.println("hada makaynch f database"+messageToStore.getFrom());
            final CustomUser customUser = new CustomUser();
            customUser.setUsername(messageToStore.getFrom());
            customUser.setDomain(message.getFrom().split("@")[1]);
            customUser.setConversations(new ArrayList<>());
            customUser.setPictureBase64("AYMANE ZAMLLL");
            customUser.setPassword(passwordEncoder.encode("pwd"));
            customUserRepository.save(customUser);
        }

        //store this message on my database
        if (conversationRepository.findConversationByUsername1AndUsername2(messageToStore.getFrom(), messageToStore.getTo()) == null && conversationRepository.findConversationByUsername1AndUsername2(messageToStore.getTo(), messageToStore.getFrom()) == null) {
            Conversation conversationToAddToMyDatabase = new Conversation();
            conversationToAddToMyDatabase.setMessages(new ArrayList<>());
            conversationToAddToMyDatabase.setUsername1(messageToStore.getFrom());
            conversationToAddToMyDatabase.setUsername2(messageToStore.getTo());
            conversationRepository.save(conversationToAddToMyDatabase);
        }

        Conversation conversation = new Conversation();

        if (conversationRepository.findConversationByUsername1AndUsername2(messageToStore.getFrom(),messageToStore.getTo()) != null) {
            conversation = conversationRepository.findConversationByUsername1AndUsername2(messageToStore.getFrom(),messageToStore.getTo());
            messageRepository.save(messageToStore);
            conversation.getMessages().add(messageToStore);
        }

        else if (conversationRepository.findConversationByUsername1AndUsername2(messageToStore.getTo(),messageToStore.getFrom()) != null) {
            conversation = conversationRepository.findConversationByUsername1AndUsername2(messageToStore.getTo(),messageToStore.getFrom());
            messageRepository.save(messageToStore);
            conversation.getMessages().add(messageToStore);
        }
        conversationRepository.save(conversation);
        // Send SSE event
        sseService.sendEventToSubscribers(messageToStore);
    }
}
