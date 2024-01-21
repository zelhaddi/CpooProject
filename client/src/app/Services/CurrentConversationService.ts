// shared.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ConversationDisplayDTO} from "../Model/ConversationDisplayDTO";


@Injectable({
    providedIn: 'root' // Assurez-vous que le service est injecté en tant que service racine pour être partagé globalement
})
export class CurrentConversationService {
    private conversationDisplayDTOBehaviorSubject = new BehaviorSubject<ConversationDisplayDTO>(new ConversationDisplayDTO());
    conversationDisplayDTO$ = this.conversationDisplayDTOBehaviorSubject.asObservable();

    updateConversationDisplayDTO(conversationDisplayDTO: ConversationDisplayDTO) {
        this.conversationDisplayDTOBehaviorSubject.next(conversationDisplayDTO);
    }

    updateConversationDisplayDTOWithEmpty() {
        this.conversationDisplayDTOBehaviorSubject.next(new ConversationDisplayDTO());
    }

}
