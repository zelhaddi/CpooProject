import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../Services/WebSocketService';
import { MyNameService } from '../../Services/MyNameService';
import { MessageService } from '../../Services/MessageService';

@Component({
    selector: 'app-PageDacceuil',
    templateUrl: './PageDacceuil.component.html',
    styleUrls: ['./PageDacceuil.component.css']
})
export class PageDacceuilComponent implements OnInit {
    messageRouter: any;
    currentUsername!: string;
    username!: string;
    messageFrom !: string;
    messageTo !: string;

    constructor(
        private websocketService: WebsocketService,
        private myNameService: MyNameService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.myNameService.getName().subscribe(
            (response: any) => {
                this.username = response.username;
                        this.currentUsername = this.username;
                        console.log('Connected as: ' + this.currentUsername);

                        // Create an EventSource object to connect to the SSE endpoint
                        const eventSource = new EventSource(
                            'serverapi/sse/stream'
                        );

                        // Register event listeners for SSE events
                        eventSource.addEventListener('open', () => {
                            console.log('SSE Connection is established');
                        });

                        //Listen to new message incoming
                        eventSource.addEventListener('event-test', (event) => {
                            // Handle SSE event data
                            const eventData = JSON.parse(event.data);
                            console.log(eventData);
                            console.log(this.currentUsername);
                            // Process and use the received data


                            if (eventData.from.split("@")[0]  === this.currentUsername|| eventData.to.split("@")[0]  === this.currentUsername) {
                                this.messageRouter = eventData;
                                // Send the message to the message service
                                this.messageService.sendMessage(eventData);
                                console.log('Received a new message: ' + eventData.body);
                            }

                        });

                        // Listen to new reaction incoming
                        eventSource.addEventListener('Reaction-event', (event) => {
                            const eventData = JSON.parse(event.data);
                            const messageId = eventData.id; // Assuming the ID is available in the event data
                            const reactionType = eventData.type; // Assuming the reaction type is available in the event data
                            console.log('Received a new reaction: ' + reactionType + ' for message ' + messageId)
                             // Assuming you inject the MessageService into your component/service
                            this.messageService.updateMessageById(messageId, reactionType);
                        });

                        eventSource.addEventListener('error', () => {
                            console.error('SSE Connection error');
                        });
                    },
                    (error) => {
                        console.error('Error fetching username:', error);
                    }
                );

    }
}
