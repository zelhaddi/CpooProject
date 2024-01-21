import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DeleteConversationService {

    constructor(private http: HttpClient) {}

    deleteConversation(username1: string, username2: string): Observable<any> {
        let backendUrl = `serverapi/conversation/deleteConversation?username1=${username1}&username2=${username2}`;
        const headers = { 'Content-Type': 'application/json' };

        return this.http.delete(backendUrl, { headers, withCredentials: true });
    }
}


