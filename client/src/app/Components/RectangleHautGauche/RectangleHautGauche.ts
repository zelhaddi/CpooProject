import { Component, OnInit } from '@angular/core';
import { ParametreService } from "../../ParametreService";
import { UserProfileDTO } from 'src/app/Model/UserProfileDto';
import { UserService } from 'src/app/Services/UserService';
import { ConversationDisplayDTO } from "../../Model/ConversationDisplayDTO";
import {SharedSearchService} from "../../Services/SharedSearchService";
import {sendMessage} from "../../Services/SendMessage";
import {RectangleBasGaucheParametreComponent} from "../RectangleBasGaucheParametre/RectangleBasGaucheParametre";
import {ReactangleBasGaucheComponent} from "../ReactangleBasGauche/ReactangleBasGauche";
import {MyNameService} from "../../Services/MyNameService";
import {MyPicturePromiseService} from "../../Services/MyPicturePromiseService";

@Component({
  selector: 'app-RectangleHautGauche',
  templateUrl: './RectangleHautGauche.component.html',
  styleUrls: ['./RectangleHautGauche.component.css']
})
export class RectangleHautGaucheComponent implements OnInit {
  searchTerm: string = '';
  displayAddContact: boolean = false;
  isUserExist: boolean = true;
  picture64: string = '';


  newFriend = {
    username: '',
    message: '',
    toDomain:''
  };

  constructor(private myPicturePromise : MyPicturePromiseService,private myNameService : MyNameService, private parametreService: ParametreService, private sendMessageService: sendMessage, private sharedSearchService: SharedSearchService, private rectangleCompo : ReactangleBasGaucheComponent) {}

  // Méthode pour soumettre le formulaire
  submitForm() {
    const { username, message, toDomain } = this.newFriend;

    // Vérifiez si les champs username et message sont valides, puis appelez le service
    if (username && message && toDomain) {
      this.sendMessageService.sendMessage(username, 'text', message, toDomain).subscribe(
        (response) => {
          // Le message a été envoyé avec succès, vous pouvez gérer la réponse ici
          console.log('Message envoyé avec succès:', response);
          // Réinitialisez les valeurs du formulaire
          this.newFriend = {
            username: '',
            message: '',
            toDomain:''
          };
          // Fermez le composant
          this.closeComponent();
          this.rectangleCompo.refreshConversations();
          this.isUserExist = true;
        },
        (error) => {
          // Gérez les erreurs ici
          if (error.status === 404) {
            console.error('Erreur 404 - Utilisateur inexistant');
            this.isUserExist = false;
            // Affichez un message d'erreur à l'utilisateur
          } else {
            console.error('Erreur lors de l\'envoi du message:', error);
            this.isUserExist = false;
            // Gérez les autres erreurs ici
          }
        }
      );
    } else {
      // Affichez un message d'erreur ou effectuez une autre action si les champs ne sont pas valides
      console.error('Les champs ne sont pas valides.');
    }
  }

  // Méthode pour afficher ou masquer le composant d'ajout de contact
  toggleAddContact() {
    this.displayAddContact = !this.displayAddContact;
  }
  toggleComponent() {
    this.displayAddContact= !this.displayAddContact
  }
  closeComponent() {
    this.displayAddContact = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  toggleParametre() {
    this.parametreService.toggleParametre();
  }

  // Méthode pour mettre à jour la valeur searchTerm
  updateSearchTerm() {
    this.sharedSearchService.changeSearchTerm(this.searchTerm);
  }


  ngOnInit() {
    console.log("Je suis dans le rectangle haut gauche")
    // Chargez initialement toutes les conversations
    this.refreshConversations();
    //I want to get my name using get name, then I take it response and I put it in my argument of the method getPicture
    this.myNameService.getName().subscribe((response: any) => {
        this.myNameService.getPicture(response.username).subscribe((response: any) => {
            this.picture64 = response.pictureBase64;
            this.myPicturePromise.changeMyPicture(this.picture64)
        });

    });
  }

  // Méthode pour rafraîchir la liste des conversations
  refreshConversations() {
    // Mettez ici votre code actuel pour récupérer les conversations depuis le service
  }
}
