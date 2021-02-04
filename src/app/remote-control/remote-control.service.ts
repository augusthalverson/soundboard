import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemoteControlService {
  // tslint:disable-next-line: variable-name
  private _isRxMode = false;
  isRxModeSubscription = new BehaviorSubject<boolean>(this._isRxMode);

  // tslint:disable-next-line: variable-name
  private _isTxMode = false;
  isTxModeSubscription = new BehaviorSubject<boolean>(this._isTxMode);

  webSocketSubject: WebSocketSubject<number> = webSocket(environment.wsUri);

  playSoundSubject = new Subject<number>();

  constructor() {
    this.webSocketSubject.subscribe(
      sound => {
        console.log(sound);
        if (this._isRxMode) {
          this.playSoundSubject.next(sound);
        }
      }
    );
  }

  set isRxMode(mode: boolean) {
    this._isRxMode = mode;
    this.isRxModeSubscription.next(this._isRxMode);
  }

  set isTxMode(mode: boolean) {
    this._isTxMode = mode;
    this.isTxModeSubscription.next(this._isTxMode);
  }

  playSound(id: number): void {
    this.webSocketSubject.next(id);
  }
}
