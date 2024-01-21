package fr.mightycode.cpoo.server.service;
import fr.mightycode.cpoo.server.dto.NewMessageDTO;
import fr.mightycode.cpoo.server.model.Message;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class SSeService {
    private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public void sendEventToSubscribers(Message message) {
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("event-test")
                        .data(message)); // Sending the entire message object
                System.out.println("rah dazet lmessage" + message.getBody() + " " + message.getFrom() + " " + message.getTo() + " " + message.getTimestamp() + " " + message.getType() + " " + message.getToDomain());
            } catch (Exception e) {
                emitter.complete();
                emitters.remove(emitter);
                System.out.println("Error sending event to client"+e);
            }
        });
    }

    public void sendReactionToSubscribers(Message message) {
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("Reaction-event")
                        .data(message)); // Sending the entire message object
                System.out.println("Rah daz mn hna c'est sur" + message.getBody() + " " + message.getFrom() + " " + message.getTo() + " " + message.getTimestamp() + " " + message.getType() + " " + message.getToDomain());
            } catch (Exception e) {
                emitter.complete();
                emitters.remove(emitter);
                System.out.println("Error sending event to client"+e);
            }
        });
    }

    public SseEmitter subscribe() {
        final SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);

        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            System.out.println("Emitter removed on completion");
        });

        return emitter;
    }
}
