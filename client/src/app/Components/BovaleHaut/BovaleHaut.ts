/*
 Created by zakar on 17/09/2023
*/

import {Component, OnInit} from '@angular/core';
import {MyNameService} from "../../Services/MyNameService";
import {Observable} from "rxjs";
import {MyPicturePromiseService} from "../../Services/MyPicturePromiseService";

@Component({
  selector: 'app-BovaleHaut', // Le sélecteur HTML pour ce composant
  templateUrl: './BovaleHaut.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./BovaleHaut.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class BovaleHautComponent implements OnInit{
    // importer le nom de login de l'utilisateur à partie de service MyNameService
    name: string = "";
    photo: string = "";

    constructor(private MyNameServ: MyNameService,private myPicturePromise : MyPicturePromiseService) {}
    ngOnInit(): void {
        this.MyNameServ.getName().subscribe((data: any) => {
            this.name = data.username;
            this.MyNameServ.getPicture(this.name).subscribe((response: any) => {
                this.photo = response.pictureBase64;
                this.myPicturePromise.changeMyPicture(this.photo);
            });
        });
    }





}
