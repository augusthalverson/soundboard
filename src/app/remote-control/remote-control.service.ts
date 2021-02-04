import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSocketMessage } from './WebSocketMessage.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { KillService } from '../kill-service/kill.service';

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

  // tslint:disable-next-line: variable-name
  private _isEnterPinMode = false;
  isEnterPinModeSubscription = new BehaviorSubject<boolean>(
    this._isEnterPinMode
  );

  private pin: number;
  pinSubscription = new Subject<number>();

  webSocketSubject: WebSocketSubject<WebSocketMessage> = webSocket(environment.wsUri);

  playSoundSubject = new Subject<number>();

  constructor(private killService: KillService) {
    this.webSocketSubject.subscribe(message => {
      if (this._isRxMode) {
        if (message.pin === this.pin) {
          if (message.type === 'sound') {
            this.playSoundSubject.next(message.payload.index);
          } else if (message.type === 'mode') {
            if (message.payload.setting === 'killAll') {
              this.killService.kill();
            }
          }
        }
      }
    });

    this.killService.killSubject.subscribe(
      () => {
        if (this._isTxMode) {
          this.webSocketSubject.next({
            type: 'mode',
            pin: this.pin,
            payload: {
              setting: 'killAll'
            }
          });
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

  set isEnterPinMode(mode: boolean) {
    this._isEnterPinMode = mode;
    this.isEnterPinModeSubscription.next(this._isEnterPinMode);
  }

  playSound(id: number): void {
    this.webSocketSubject.next({
      type: 'sound',
      pin: this.pin,
      payload: {
        index: id,
      }
    });
  }

  setPin(pin: number): void {
    this.pin = pin;
    this.pinSubscription.next(this.pin);
  }
}
