export interface WebSocketMessage {
    type: 'sound' | 'volume' | 'mode';
    pin: string;
    payload: any;
}
