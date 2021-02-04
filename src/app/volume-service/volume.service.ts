import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VolumeService {

  volumeSubject = new BehaviorSubject<number>(.65);
  // tslint:disable-next-line: variable-name
  private _volume = .65;

  constructor() { }

  set volume(value: number) {
    this._volume = value;
    this.volumeSubject.next(this._volume);
  }
}
