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
@Injectable()
@Component({
  selector: 'app-Bconversation', // Le sélecteur HTML pour ce composant
  templateUrl: './Bconversation.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./Bconversation.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
@Injectable()
export class BconversationComponent implements OnInit{
  @Input() username! : string;
  messages: Message[] = [];
  username$: Observable<string>
  userProfileDTO!: UserProfileDTO;
  messageFrom!: string;
    messageTo!: string;

  constructor(private messagesOfConversation: MessagesOfConversation, private messageOfConversation: MessagesOfConversation, private communicationService: CommunicationService,private userOnConversationService : userOnConversation,  private messageService: MessageService ) {
    this.username$ = this.userOnConversationService.username$;
  }

  ngOnInit() {
    this.username$.subscribe(username => {
      this.username = username;
      console.log(username);
      this.userProfileDTO = new UserProfileDTO(this.username);

      this.messageService.messageSent$.subscribe(() => {
        // Appelez la méthode du service pour obtenir les messages à chaque envoi de message
        this.messageOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
          this.messages = messages;
        });
        this.messages.forEach(message => this.messageService.addOnList(message));
      });

      // Appelez la méthode du service pour obtenir les messages au chargement initial
      this.messageOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
        this.messages = messages;
      });


      // Abonnez-vous au service de communication pour mettre à jour la liste de messages
      this.messageService.messageSent$.subscribe((message) => {
        // Assurez-vous que le message est destiné au username actuel
        console.log("ha ana : " + this.username + "ha lfrom : " + message.from + "ha lto : " + message.to);
        this.messageFrom = message.from.split("@")[0];
        this.messageTo = message.to.split("@")[0];
        if (this.messageFrom === this.username || this.messageTo === this.username) {
          console.log("tanduz hna btw");
          // Ajoutez le message à la liste
          this.messages.push(message);
        }
      });
    })

  }
  updateMessages(id: string) {
    const index = this.messages.findIndex(message => message.id === id);
    if (index !== -1) {
      this.messages.splice(index, 1); // Remove the message from the array
    }
  }


  loadMessages() {
    this.messagesOfConversation.getAllMessagesOfConversation(this.username).subscribe((messages) => {
      this.messages = messages;

      //for each message in messages I want to call him the method send message of messageService
      this.messages.forEach(message => this.messageService.addOnList(message));
    });
  }

}
