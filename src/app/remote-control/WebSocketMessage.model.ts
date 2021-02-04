export interface WebSocketMessage {
    type: 'sound' | 'volume' | 'mode';
    pin: number;
    payload: any;
}
