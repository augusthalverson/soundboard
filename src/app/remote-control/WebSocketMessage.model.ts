export interface WebSocketMessage {
    type: 'sound' | 'volume' | 'mode' | 'ping';
    pin?: string;
    payload?: any;
}
