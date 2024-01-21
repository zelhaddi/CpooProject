/*
 Created by goat on 10/21/23
*/

import {Component} from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MyNameService {
  private backendUrl = 'serverapi/user/username';
  private backendUrl2 = 'serverapi/user/getDomain';
  private backendUrl3 = 'serverapi/user/getPicture';

  constructor(private http: HttpClient) {}

  getName() {
    return this.http.get(this.backendUrl, { withCredentials: true });
  }

  getDomain(login: string){
    const body = { login};
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.backendUrl2, body, { headers, withCredentials: true });
  }

  getPicture(login: string){
    const body = { login };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.backendUrl3, body, { headers, withCredentials: true });
  }
}
