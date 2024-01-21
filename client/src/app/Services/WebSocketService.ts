import { Injectable } from '@angular/core';
import { Client, StompConfig } from '@stomp/stompjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private client: Client;

  constructor() {
    this.client = new Client();
  }

  connect(): Observable<any> {
    const stompConfig: StompConfig = {
      brokerURL: 'ws://localhost:8081/router', // Set the server's URL directly #wss://cpoo-router.mightycode.tech/router
      debug: (str) => console.log(str),
    };

    this.client.configure(stompConfig);

    return new Observable<any>((observer) => {
      this.client.onConnect = (frame) => {
        observer.next(frame);
      };
      this.client.activate();
    });
  }


  subscribe(destination: string, callback: (message: any) => void) {
    this.client.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  }

  disconnect() {
    this.client.deactivate();
  }
}

