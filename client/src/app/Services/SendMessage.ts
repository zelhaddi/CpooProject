import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sendMessage {
  constructor(private http: HttpClient) {}

  private backendUrl = 'serverapi/message';

  sendMessage(to: string,type:String, body: string, toDomain:string): Observable<any> {
    const body1 = {
      to,
      type,
      body,
      toDomain
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(this.backendUrl, body1, { headers, withCredentials: true });
  }
}