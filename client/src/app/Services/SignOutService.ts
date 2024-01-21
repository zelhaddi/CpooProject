import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SignOutService {
  private backendUrl = 'serverapi/user/signout';

  constructor(private http: HttpClient) {}

  signOut() {
    const body = { };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.backendUrl, body, { headers, withCredentials:true   });
  }
}
