/*
 Created by zakar on 16/09/2023
*/

import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ConversationDisplayDTO } from 'src/app/Model/ConversationDisplayDTO';
import { GetAllConversationService } from 'src/app/Services/GetAllConversationService';
import { userOnConversation } from 'src/app/Services/UserOnConversation';
import { Observable } from 'rxjs';
import {MessageService} from "../../Services/MessageService";
import {MyNameService} from "../../Services/MyNameService";

@Component({
  selector: 'app-BrectangleCentrale', // Le sélecteur HTML pour ce composant
  templateUrl: './BrectangleCentrale.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BrectangleCentrale.component.css'], // Le chemin vers le fichier CSS du composant (facultatif)
  animations: [
    trigger('slideFromBottom', [
      state('void', style({ transform: 'translateY(100%)' })),
      transition(':enter', animate('300ms ease-out')),
      transition(':leave', animate('300ms ease-in')),
    ]),
  ],
})
export class BrectangleCentraleComponent {
  username!: string;
  domain!: string;
  conversationUpDisplay : boolean = false;

  isConversationExist : boolean = false;
  messageFrom : string = "";
    messageTo : string = "";


  onclickOvaleUp(){
    this.conversationUpDisplay = !this.conversationUpDisplay;
    this.ngOnInit();
  }

  conversations : ConversationDisplayDTO[] = [];
  constructor(private conversationService : GetAllConversationService, private userOnConversationService : userOnConversation, private messageService : MessageService, private myNameService : MyNameService) {
  }
  ngOnInit() {


    this.conversationService.getAllConversations().subscribe(
      (data: ConversationDisplayDTO[]) => {
        this.conversations = data;
        this.isConversationExist = true;
      },
      (error) => {
        if (error.status === 404) {
          console.log("There are no conversations (404 Not Found)");
        }
      }
    );

    this.userOnConversationService.username$.subscribe(username => {
      this.username = username;
      this.userOnConversationService.domain$.subscribe(domain => {
        this.domain = domain;
      });
    })



    this.messageService.messageSent$.subscribe((message) => {
      let conversationFound = false; // Un indicateur pour savoir si une conversation a été trouvée

      for (const conversation of this.conversations) {
        this.messageFrom = message.from.split("@")[0];
        this.messageTo = message.to.split("@")[0];
        if (conversation.username === this.messageFrom || conversation.username === this.messageTo) {
          conversation.lastMessage = message.body;
          if (this.messageFrom === conversation.username ) {
            conversation.isSeen = false;
          }
          conversationFound = true; // Une conversation a été trouvée
        }
      }

      // Si aucune conversation n'a été trouvée, rechargez la liste des conversations
      if (!conversationFound) {
        this.refreshConversations();
      }
    });
  }

// Méthode pour rafraîchir la liste des conversations
  refreshConversations() {
    this.conversationService.getAllConversations().subscribe(
      (data: ConversationDisplayDTO[]) => {
        this.conversations = data;
        this.isConversationExist = true;
      },
      (error) => {
        if (error.status === 404) {
          console.log("There are no conversations (404 Not Found)");
        }
      }
    );
  }

  onConversationClick(username: string) {
    this.myNameService.getDomain(username)
        .subscribe(
            (response: any) => { // Use 'any' type for the response for simplicity
              if (response && response.domain) {
                const domain = response.domain;
                this.userOnConversationService.updateUsernameAndDomain(username, domain);
                const conversation = this.conversations.find(conversation => conversation.username === username);
                if (conversation) {
                  conversation.isSeen = true;
                }
              } else {
                // Handle the case where the response doesn't contain the expected data
                console.error('Invalid response format');
              }
            },
            (error) => {
              // Handle the error, e.g., show an error message or perform other actions
              console.error('Error getting domain:', error);
            }
        );
  }


}
