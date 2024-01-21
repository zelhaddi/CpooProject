import { Component, Input } from '@angular/core';
import { ReactToMessageService } from '../../Services/ReactToMessageService';
import {DeleteMessageService} from "../../Services/DeleteMessageService";
import {ConversationComponent} from "../Conversation/Conversation";
import {BconversationComponent} from "../Bconversation/Bconversation";

@Component({
  selector: 'app-ReactionComponent',
  templateUrl: './ReactionComponent.component.html',
  styleUrls: ['./ReactionComponent.component.css']
})
export class ReactionComponentComponent {
  @Input() messageId: string = '';
  @Input() messageBody: string = '';

  constructor(private BConv : BconversationComponent, private reactToMessageService: ReactToMessageService, private deleteMessageService : DeleteMessageService, private conv : ConversationComponent) {}

  ReactToMessage(reaction: string) {
    this.reactToMessageService.setReaction(this.messageId, reaction).subscribe();
    console.log('Reacted to message ' + this.messageId + ' with reaction ' + reaction);
  }

  copyMessage() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(this.messageBody)
          .then(() => {
            console.log('Message copied to clipboard: ' + this.messageBody);
          })
          .catch((error) => {
            console.error('Error copying message:', error);
          });
    } else {
      console.error('Clipboard API not available');
    }
  }

  deleteMessage() {
      this.deleteMessageService.DeleteMessage(this.messageId).subscribe(
          (response) => {
                  this.conv.updateMessages(this.messageId);
                    this.BConv.updateMessages(this.messageId);
          },
          (error) => {
              // Handle error if needed
          }
      );
  }

}

