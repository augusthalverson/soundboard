import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KillService {

  killSubject = new Subject<boolean>();

  soundsPlaying = [];
  isSoundPlayingSubject = new Subject<boolean>();

  constructor() { }

  public kill(): void {
    this.killSubject.next();
    this.soundsPlaying = [];
    this.isSoundPlayingSubject.next(false);
  }

  public addPlaying(name: string): void {
    this.soundsPlaying.push(name);
    this.isSoundPlayingSubject.next(true);
  }

  public stopPlaying(name: string): void {
    for (let i = 0; i < this.soundsPlaying.length; i++) {
      if (this.soundsPlaying[i] === name) {
        this.soundsPlaying.splice(i, 1);
      }
    }
    if (this.soundsPlaying.length === 0) {
      this.isSoundPlayingSubject.next(false);
    }
  }
}
