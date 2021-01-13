import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  constructor() { }

  private restart = false;
  restartSubject = new BehaviorSubject<boolean>(this.restart);

  setRestartMode(mode: boolean): void {
    this.restart = mode;
    this.restartSubject.next(this.restart);
  }
}
