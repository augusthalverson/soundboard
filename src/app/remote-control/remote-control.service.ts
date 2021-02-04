import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { SoundMessage } from './soundMessage.model';

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

  webSocketSubject: WebSocketSubject<SoundMessage> = webSocket(environment.wsUri);

  playSoundSubject = new Subject<number>();

  constructor() {
    this.webSocketSubject.subscribe((soundMessage) => {
      if (this._isRxMode) {
        if (soundMessage.pin === this.pin) {
          this.playSoundSubject.next(soundMessage.index);
        }
      }
    });
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
      pin: this.pin,
      index: id,
    });
  }

  setPin(pin: number): void {
    this.pin = pin;
    this.pinSubscription.next(this.pin);
  }
}
