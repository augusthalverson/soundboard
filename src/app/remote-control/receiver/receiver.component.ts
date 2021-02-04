import { Component, OnInit } from '@angular/core';
import { RemoteControlService } from '../remote-control.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {

  constructor(private remoteControlService: RemoteControlService) { }

  pinNumberOne: number;
  pinNumberTwo: number;
  pinNumberThree: number;
  pinNumberFour: number;

  pin: number;

  ngOnInit(): void {
    this.pinNumberOne = Math.floor(Math.random() * 10);
    this.pinNumberTwo = Math.floor(Math.random() * 10);
    this.pinNumberThree = Math.floor(Math.random() * 10);
    this.pinNumberFour = Math.floor(Math.random() * 10);

    this.pin = Number.parseInt(
      this.pinNumberOne.toString() +
      this.pinNumberTwo.toString() +
      this.pinNumberThree.toString() +
      this.pinNumberFour.toString(), 10);

    this.remoteControlService.setPin(this.pin);
  }

  handleExit(): void {
    this.remoteControlService.isRxMode = false;
  }
}
