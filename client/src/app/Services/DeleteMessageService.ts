import {Inject, Injectable, Optional} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from "../Model/Message";
import {HttpClient, HttpContext, HttpEvent, HttpHeaders, HttpParameterCodec, HttpResponse} from "@angular/common/http";
import {MessageDTO} from "../Model/MessageDTO";



@Injectable()
export class DeleteMessageService {
    constructor(private http: HttpClient) {}


    DeleteMessage(id:string): Observable<any> {
        let backendUrl = 'serverapi/message/deleteMessage/'+id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.delete(backendUrl, { headers, withCredentials: true });
    }
}