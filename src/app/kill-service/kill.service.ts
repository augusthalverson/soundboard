import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KillService {

  killSubject = new Subject<boolean>();

  constructor() { }

  public kill(): void {
    this.killSubject.next();
  }
}
