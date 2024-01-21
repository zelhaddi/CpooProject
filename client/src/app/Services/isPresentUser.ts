import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()

export class isPresentUserService {

    constructor(private http: HttpClient) {}

    isPresentUser(username: string): Observable<any> {
        let backendUrl = `serverapi/user/exists?username=${username}`;
        const headers = { 'Content-Type': 'application/json' };

        return this.http.get(backendUrl, { headers, withCredentials: true });
    }
}