import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { sendMessage } from 'src/app/Services/SendMessage';
import { MessagesOfConversation } from 'src/app/Services/MessageOfCOnversationService';
import { CommunicationService } from 'src/app/Services/communicationService';
import {FormsModule, NgForm} from '@angular/forms';
import {MessageService} from "../../Services/MessageService";
import {MyNameService} from "../../Services/MyNameService";
import {userOnConversation} from "../../Services/UserOnConversation";
import {ReactangleBasGaucheComponent} from "../ReactangleBasGauche/ReactangleBasGauche";

@Component({
  selector: 'app-MessageInput',
  templateUrl: './MessageInput.component.html',
  styleUrls: ['./MessageInput.component.css']
})
export class MessageInputComponent implements OnInit {
  username!: string;
  domain!: string;
  messageText: string = ''; // Liaison de modèle pour l'entrée
  currentUsername !: string ;
  @ViewChild('messageForm') messageForm!: NgForm; // Reference to the form

  constructor(private userOnConv : userOnConversation, private messageService : MessageService, private message: sendMessage, private TousMessages: MessagesOfConversation, private communicationService: CommunicationService, private myNameService : MyNameService,private rectangleBasGauche : ReactangleBasGaucheComponent) {}

    ngOnInit() {
        this.userOnConv.username$.subscribe((username: string) => {
        this.username = username;
        });
        this.userOnConv.domain$.subscribe((domain: string) => {
        this.domain = domain;
        });
    }

  sendMessage() {

    if (this.messageForm.valid) { // Check if the form is valid
      if (this.messageText) { // Vérifiez si le messageText n'est pas vide
        this.myNameService.getName().subscribe(
      (response: any) => {
            this.currentUsername = response.username;
        this.message.sendMessage(this.username, '', this.messageText, this.domain).subscribe(
            (response) => {
              console.log('Message envoyé avec succès', response);
              this.messageText = ''; // Réinitialisez le champ de texte après l'envoi
              //this.communicationService.sendMessageSent();
                this.rectangleBasGauche.refreshConversations();
            },
            (error) => {
              console.error("Erreur lors de l'envoi du message", error);
            }
        );
          },
          (error) => {
            console.error('Error fetching username:', error);
          }
        );
      }
    }
  }
}
