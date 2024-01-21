export class MessageReaction {
    id: string;
    type: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }
}