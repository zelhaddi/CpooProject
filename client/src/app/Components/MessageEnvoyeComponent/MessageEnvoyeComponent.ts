/*
 Created by zakar on 16/09/2023
*/

import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import { Message } from 'src/app/Model/Message';

@Component({
  selector: 'app-MessageEnvoyeComponent', // Le sélecteur HTML pour ce composant
  templateUrl: './MessageEnvoyeComponent.component.html', // Le chemin vers le fichier HTML du composant
  styleUrls: ['./MessageEnvoyeComponent.component.css'] // Le chemin vers le fichier CSS du composant (facultatif)
})
export class MessageEnvoyeComponentComponent implements OnInit{
  reactionDisplayOn : boolean = false;
  @Input() message!: Message;
  sentTime: string = ''; // Variable pour stocker l'heure d'envoi du message
  constructor(private elementRef: ElementRef) {}
  buttonReaction (event : Event) {
    event.stopPropagation();
    this.reactionDisplayOn = true;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if(this.reactionDisplayOn) {
        this.reactionDisplayOn = false;
      }
    }
  }

  ngOnInit() {
    // Appeler la fonction pour obtenir l'heure d'envoi au moment de l'initialisation du composant
    this.updateSentTime();
  }

  updateSentTime() {
    const sentDate = new Date(this.message.timestamp);
    const hours = sentDate.getHours().toString().padStart(2, '0');
    const minutes = sentDate.getMinutes().toString().padStart(2, '0');
    this.sentTime = `${hours}:${minutes}`;
  }

  
}
