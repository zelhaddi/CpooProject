


/*
 Created by zakar on 16/09/2023
*/

import {Component, Injectable, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/Model/Message';
import { UserProfileDTO } from 'src/app/Model/UserProfileDto';
import { MessagesOfConversation } from 'src/app/Services/MessageOfCOnversationService';
import { userOnConversation } from 'src/app/Services/UserOnConversation';
import { CommunicationService } from 'src/app/Services/communicationService';
import {MessageService} from "../../Services/MessageService";

@Component({
  selector: 'app-Conversation', // Le sélecteur HTML pour ce composant
  templateUrl: './Conversation.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./Conversation.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
@Injectable()
export class ConversationComponent implements OnInit{
  username! : string;
  messages: Message[] = [];
  username$: Observable<string>

  constructor(
    private messagesOfConversation: MessagesOfConversation,
    private communicationService: CommunicationService,
    private userOnConversationService: userOnConversation,
    private messageService: MessageService,
    private userOnConv : userOnConversation,

  ) {
    this.username$ = this.userOnConversationService.username$;
  }
  ngOnInit() {
    this.userOnConv.username$.subscribe((username: string) => {
      this.username = username;
    });
    this.communicationService.messageSent$.subscribe(() => {
      this.loadMessages(); // Chargez les messages immédiatement après le clic

      // Utilisez setTimeout pour retarder le chargement initial des messages
      setTimeout(() => {
        this.loadMessages(); // Chargez à nouveau les messages après un court délai
      }, 100);
    });

    // Chargez les messages au chargement initial avec un léger délai
    setTimeout(() => {
      this.loadMessages();
    }, 100);


    // Abonnez-vous au service de communication pour mettre à jour la liste de messages
    this.messageService.messageSent$.subscribe((message) => {
        this.loadMessages();
    });
  }
  loadMessages() {
    this.messagesOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
      this.messages = messages;

      //for each message in messages I want to call him the method send message of messageService
      this.messages.forEach(message => this.messageService.addOnList(message));
    });
  }

  updateMessages(id: string) {
    const index = this.messages.findIndex(message => message.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1); // Remove the message from the array
    }
  }


}
