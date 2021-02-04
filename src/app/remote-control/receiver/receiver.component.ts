import { Component, OnInit } from '@angular/core';
import { RemoteControlService } from '../remote-control.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})
export class ReceiverComponent implements OnInit {

  constructor(private remoteControlService: RemoteControlService) { }

  ngOnInit(): void {
  }

  handleExit(): void {
    this.remoteControlService.isRxMode = false;
  }
}
