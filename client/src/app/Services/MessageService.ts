import {Inject, Injectable, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from "../Model/Message";
import {HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParameterCodec, HttpResponse} from "@angular/common/http";
import {MessageDTO} from "../Model/MessageDTO";



@Injectable()
export class MessageService {
  private messageSource = new Subject<Message>();
  messageSent$ = this.messageSource.asObservable();
  private messages: Message[] = []; // Your collection of messages


  // Add a method to add a message to the list
  sendMessage(message: Message) {
    this.messages.push(message);
    this.messageSource.next(message); // Emit the new message to subscribers
  }

  addOnList(message: Message) {
    this.messages.push(message);

  }

  // Add a method to update a message type by ID
  updateMessageById(id: string, newType: string) {
    // Find the message by ID
    console.log(this.messages.length);
    const messageToUpdate = this.messages.find(message => message.id === id);

    if (messageToUpdate) {
      // Update the message type
      messageToUpdate.type = newType;
      this.messageSource.next(messageToUpdate); // Emit the updated message to subscribers
    }
  }
}