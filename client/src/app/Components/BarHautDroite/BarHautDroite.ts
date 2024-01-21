/*
 Created by zakar on 16/09/2023
*/

import {Component, Input} from '@angular/core';
import {userOnConversation} from "../../Services/UserOnConversation";
import {PhotoChangeService} from "../../Services/PhotoChangeService";
import {IsInternService} from "../../Services/IsInternService";

@Component({
  selector: 'app-BarHautDroite', // Le sélecteur HTML pour ce composant
  templateUrl: './BarHautDroite.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BarHautDroite.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class BarHautDroiteComponent {
  username!: string;
  photo: string = '';
  isIntern: boolean = false;

  constructor(private userOnConv : userOnConversation,private photoService: PhotoChangeService, private isInternSefvice: IsInternService) {}

  ngOnInit() {
    this.userOnConv.username$.subscribe((username: string) => {
      this.username = username;
      this.isInternSefvice.isIntern$.subscribe((isIntern: boolean) => {
        this.isIntern = isIntern;
        console.log("Is Intern: " + isIntern);

        if (isIntern) {
          // If 'isIntern' is true, get the photo from the service
          this.photoService.currentPhoto.subscribe((photo: string) => {
            this.photo = photo;
            console.log("Photo from service: " + photo);
            // Update any necessary logic or UI with the new photo value here
          });
        } else {
          // If 'isIntern' is false, set the photo to the first letter of the username
          this.photo = this.getFirstLetter(this.username);
          console.log("Photo from username: " + this.photo);
          // Update any necessary logic or UI with the new photo value here
        }
      }
      );
    });
  }
  getFirstLetter(username: string): string {
    if (username && username.length > 0) {
      return username.charAt(0).toUpperCase();
    } else {
      return ''; // Handle empty or undefined usernames
    }
  }


}
