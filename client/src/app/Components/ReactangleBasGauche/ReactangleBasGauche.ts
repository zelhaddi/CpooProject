/*
 Created by zakar on 16/09/2023
*/

import {Component, Injectable, OnInit} from '@angular/core';
import {ConversationDisplayDTO} from "../../Model/ConversationDisplayDTO";

import {userOnConversation} from "../../Services/UserOnConversation";
import { GetAllConversationService } from 'src/app/Services/GetAllConversationService';
import { CommunicationService } from 'src/app/Services/communicationService';
import {MessageService} from "../../Services/MessageService";
import {MyNameService} from "../../Services/MyNameService";
import {SharedSearchService} from "../../Services/SharedSearchService";
import {PhotoChangeService} from "../../Services/PhotoChangeService";
import {IsInternService} from "../../Services/IsInternService";
@Injectable()
@Component({
  selector: 'app-ReactangleBasGauche', // Le sélecteur HTML pour ce composant
  templateUrl: './ReactangleBasGauche.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./ReactangleBasGauche.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})

export class ReactangleBasGaucheComponent implements OnInit{
  conversations: ConversationDisplayDTO[] = [];
  isConversationExist: boolean = false;
  searchTerm: string = '';
  messageFrom : string = '';
  messageTo : string = '';
    picture64: string = '';
  constructor(private isIntern : IsInternService,private photoService: PhotoChangeService,private sharedSearchService: SharedSearchService, private conversationService : GetAllConversationService, private username : userOnConversation, private myNameService : MyNameService, private communicationService: CommunicationService, private messageService : MessageService) {
    this.conversationService.conversationDeleted.subscribe(() => {
      this.refreshConversations();
    });
  }
  ngOnInit() {

    this.messageService.messageSent$.subscribe((message) => {
      let conversationFound = false; // Un indicateur pour savoir si une conversation a été trouvée

      for (const conversation of this.conversations) {
        this.messageFrom = message.from.split("@")[0];
        this.messageTo = message.to.split("@")[0];
        if (conversation.username === message.from || conversation.username  === message.to) {
          conversation.lastMessage = message.body;
          conversation.timestamp = message.timestamp;
          if (message.from === conversation.username) {
            conversation.isSeen = false;
          }
          conversationFound = true; // Une conversation a été trouvée
        }
      }

      // Si aucune conversation n'a été trouvée, rechargez la liste des conversations
        this.refreshConversations();

    });

    // Abonnez-vous aux changements de searchTerm
    this.sharedSearchService.currentSearchTerm.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.filterConversations(); // Appelez la méthode de filtrage
    });

  }

// Méthode pour rafraîchir la liste des conversations
  public refreshConversations() {
    this.conversationService.getAllConversations().subscribe(
      (data: ConversationDisplayDTO[]) => {
        this.conversations = data.sort((a, b) => b.timestamp - a.timestamp);
        this.isConversationExist = true;
        console.log("hna mzyana")
      },
      (error) => {
        if (error.status === 404) {
          console.log("There are no conversations (404 Not Found)");
        }
      }
    );
  }

  refreshConversationsAfterSendingMessageToExistingConv() {
    this.conversations = this.conversations.sort((a, b) => b.timestamp - a.timestamp);

    console.log("salam ana hna  " + this.conversations.length);
          this.isConversationExist = true;
  }

  // Event handler for conversation click
  onConversationClick(username: string) {
    this.myNameService.getDomain(username)
        .subscribe(
            (response: any) => { // Use 'any' type for the response for simplicity
              if (response && response.domain) {
                const domain = response.domain;
                this.username.updateUsernameAndDomain(username, domain);
                this.communicationService.sendMessageSent();
                const conversation = this.conversations.find(conversation => conversation.username === username);
                if (conversation) {
                  conversation.isSeen = true;
                }
              }
            }
        );
  }
  // Méthode pour filtrer les conversations
  filterConversations() {
    if (this.searchTerm) {
      this.conversations = this.conversations.filter(conversation =>
        conversation.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Réinitialisez la liste complète des conversations
      this.refreshConversations();
    }
  }
  //cette fonction prend en paramètre une conversation et retourne le premier lettre en majuscule
  getFirstLetter(conversation: ConversationDisplayDTO): string {
    return conversation.username.charAt(0).toUpperCase();
  }

  getPicture(username : string): string {
    this.myNameService.getName().subscribe((response: any) => {
      console.log("Connexion réussie:zdczcz " + response.username);
      this.myNameService.getPicture(response.username).subscribe((response: any) => {
        console.log("Connexion réussie: " + response.pictureBase64);
        this.picture64 = response.pictureBase64;
        return this.picture64;
      });

    });
    return this.picture64;
  }

  updatePicture(photo : string){
    this.photoService.changePhoto(photo);
  }
  updateIsInterne(isIntern : boolean){
    this.isIntern.isInternUpdate(isIntern);
  }
  

}
