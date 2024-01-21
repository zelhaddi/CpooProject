export class Message {
    id: string;
    timestamp: number;
    from: string;
    to: string;
    type: string;
    body: string;
    toDomain: string;
  
    constructor(id: string, timestamp: number, from: string, to: string, type: string, body: string, domain: string) {
      this.id = id;
      this.timestamp = timestamp;
      this.from = from;
      this.to = to;
      this.type = type;
      this.body = body;
      this.toDomain = domain;
    }
  }