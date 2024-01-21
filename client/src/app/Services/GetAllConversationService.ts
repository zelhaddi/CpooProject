import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ConversationDisplayDTO} from "../Model/ConversationDisplayDTO";

@Injectable()
export class GetAllConversationService{
  private backendUrl = 'serverapi/conversation/getAllConversationsOfUser';
  conversationDeleted = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  getAllConversations(): Observable<ConversationDisplayDTO[]> {
    return this.http.get<ConversationDisplayDTO[]>(this.backendUrl, { withCredentials: true });
  }


  triggerConversationDeleted() {
    this.conversationDeleted.emit();
  }
}
