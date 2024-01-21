/*
 Created by zakar on 16/09/2023
*/

import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import { MessagesOfConversation } from 'src/app/Services/MessageOfCOnversationService';
import { MessageService } from 'src/app/Services/MessageService';
import { userOnConversation } from 'src/app/Services/UserOnConversation';
import { CommunicationService } from 'src/app/Services/communicationService';
import {PhotoChangeService} from "../../Services/PhotoChangeService";
import {ConversationDisplayDTO} from "../../Model/ConversationDisplayDTO";
import {DeleteConversationService} from "../../Services/DeleteConversatioService";
import {MyNameService} from "../../Services/MyNameService";
import {GetAllConversationService} from "../../Services/GetAllConversationService";
import {ReactangleBasGaucheComponent} from "../ReactangleBasGauche/ReactangleBasGauche";

@Component({
  selector: 'app-ConversationHistoriqueComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './ConversationHistoriqueComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./ConversationHistoriqueComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
@Injectable()
export class ConversationHistoriqueComponentComponent implements OnInit {
  @Input() conversation!: ConversationDisplayDTO
  sentTime: string = "";
  username$: any;
  username1: string = "";
  isContextMenuVisible: boolean = false;

  constructor(
    private messagesOfConversation: MessagesOfConversation,
    private communicationService: CommunicationService,
    private userOnConversationService: userOnConversation,
    private messageService: MessageService,
    private DeleteConversatioService: DeleteConversationService,
    private Mynameservice: MyNameService,
    private conversationService: GetAllConversationService
  ) {
    this.username$ = this.userOnConversationService.username$;
  }

  ngOnInit() {
    this.communicationService.messageSent$.subscribe(() => {
      this.updateSentTime();
      setTimeout(() => {
        this.updateSentTime();
      }, 100);
    });
    setTimeout(() => {
      this.updateSentTime();
    }, 100);


    this.messageService.messageSent$.subscribe((message) => {
      this.updateSentTime();
  });
    this.Mynameservice.getName().subscribe((username) => {
      this.username1 = JSON.stringify(username);
      //extraire username à partir de l'objet JSON
    });
  }

  
  updateSentTime() {
    const sentDate = new Date(this.conversation.timestamp);
    const hours = sentDate.getHours().toString().padStart(2, '0');
    const minutes = sentDate.getMinutes().toString().padStart(2, '0');
    this.sentTime = `${hours}:${minutes}`;
  }
  getFirstLetter(conversation: ConversationDisplayDTO): string {
    return conversation.username.charAt(0).toUpperCase();
  }
  //extraire username 1 et 2
    //appeler le service pour supprimer la conversation



  deleteConversation() {
    this.DeleteConversatioService.deleteConversation(this.extractUsernameValue(this.username1), this.conversation.username).subscribe(
        () => {
          console.log('Conversation supprimée avec succès.');
          this.conversationService.triggerConversationDeleted();
        },
        (error) => {
          console.error('Erreur lors de la suppression de la conversation:', error);
        }
    );
  }


  onRightClick(event: MouseEvent) {
    event.preventDefault(); // Empêche le menu contextuel par défaut

    // Affichez votre propre menu contextuel
    this.isContextMenuVisible = true;

    // Assurez-vous de masquer le menu après avoir effectué l'action (suppression dans ce cas)
    window.addEventListener('click', () => {
      this.isContextMenuVisible = false;
    }, { once: true });
  }
  private extractUsernameValue(jsonString: string): string {
    const usernameKey = '"username":"';
    const startIndex = jsonString.indexOf(usernameKey) + usernameKey.length;
    const endIndex = jsonString.indexOf('"', startIndex);
    const usernameValue = jsonString.substring(startIndex, endIndex);

    return usernameValue;
  }




}

  

