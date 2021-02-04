import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoopService {

  loopSubject = new Subject<boolean>();
  private isLooping = false;

  constructor() { }

  public setLooping(shouldLoop: boolean): void {
    this.isLooping = shouldLoop;
    this.loopSubject.next(this.isLooping);
  }
}
