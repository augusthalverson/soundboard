import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RemoteControlService } from '../remote-control/remote-control.service';
import { VolumeService } from '../volume-service/volume.service';

@Component({
  selector: 'app-fader',
  templateUrl: './fader.component.html',
  styleUrls: ['./fader.component.scss'],
})
export class FaderComponent implements OnInit {
  constructor(private volumeService: VolumeService, private remoteControlService: RemoteControlService) { }

  @ViewChild('volume') volumeFader: ElementRef;

  isTxMode = false;
  isRxMode = false;

  ngOnInit(): void {
    this.remoteControlService.isTxModeSubscription.subscribe(
      newTxMode => {
        this.isTxMode = newTxMode;
      }
    );

    this.remoteControlService.isRxModeSubscription.subscribe(
      newRxMode => {
        this.isRxMode = newRxMode;
      }
    );

    this.volumeService.volumeSubject.subscribe(
      newVolume => {
        if (this.isRxMode) {
          this.volumeFader.nativeElement.value = 100 - (newVolume * 100);
        }
      }
    );
  }

  handleMove(value: number): void {
    this.volumeService.volume = (100 - value) / 100;
  }

  handleChange(value: number): void {
    if (this.isTxMode) {
      this.remoteControlService.setVolumeChange((100 - value) / 100);
    }
  }
}
