/*
 Created by goat on 10/21/23
*/

import {Component} from '@angular/core';


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SignUpService {
  private backendUrl = 'serverapi/user/signup';

  constructor(private http: HttpClient) {}

  signUp(login: string, password: string, domain: string, pictureBase64: string) {
    const body = { login, password, domain, pictureBase64 };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.backendUrl, body, { headers});
  }
}
