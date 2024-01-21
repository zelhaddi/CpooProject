export interface MessageDTO {
    to: string;
    type: string;
    body: string;
    id?: string;
    timestamp?: number;
    from?: string;
}

