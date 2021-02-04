import { Component, OnInit } from '@angular/core';
import { RemoteControlService } from '../remote-control.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  isTxMode = false;

  constructor(private remoteControlService: RemoteControlService) { }

  ngOnInit(): void {
    this.remoteControlService.isTxModeSubscription.subscribe(
      newTxMode => {
        this.isTxMode = newTxMode;
      }
    );
  }

  handleActivateReceive(): void {
    this.remoteControlService.isRxMode = true;
  }

  handleActivateTransmit(): void {
    this.remoteControlService.isTxMode = true;
  }
}
