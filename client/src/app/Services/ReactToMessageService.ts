import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageReaction} from "../Model/MessageReaction";

@Injectable()
export class ReactToMessageService {

    private backendUrl = 'serverapi/message/addReactionToMessage';
    constructor(private http: HttpClient) {}


    setReaction(id: string, type: string) {
        let messageReaction = new MessageReaction(id, type);

        const body = messageReaction;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(this.backendUrl, body, { headers, withCredentials: true });
    }
}
