import { Component, OnInit } from '@angular/core';
import { KillService } from './kill-service/kill.service';
import { ModeService } from './mode-service/mode.service';
import { LoopService } from './loop-service/loop.service';
import soundsConfig from './sounds';
import { RemoteControlService } from './remote-control/remote-control.service';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'soundboard';

  restartMode = true;
  loopMode = false;
  isPlaying = false;
  isPlayingLabel = false;
  isReceiverMode = false;
  isEnterPinMode = true;

  sounds = soundsConfig;

  constructor(
    private killService: KillService,
    private modeService: ModeService,
    private loopService: LoopService,
    private remoteControlService: RemoteControlService
  ) {}

  ngOnInit(): void {
    this.modeService.restartSubject.subscribe((newMode) => {
      this.restartMode = newMode;
    });

    this.loopService.loopSubject.subscribe((newMode) => {
      this.loopMode = newMode;
    });

    this.killService.isSoundPlayingSubject.subscribe((newState) => {
      this.isPlaying = newState;
    });

    setInterval(() => {
      this.isPlayingLabel = !this.isPlayingLabel;
    }, 800);

    this.remoteControlService.isRxModeSubscription.subscribe(
      (newReceiverMode) => {
        this.isReceiverMode = newReceiverMode;
      }
    );

    this.remoteControlService.isEnterPinModeSubscription.subscribe(
      newEnterPinMode => {
        this.isEnterPinMode = newEnterPinMode;
      }
    );
  }

  setRestartMode(mode: boolean): void {
    this.modeService.setRestartMode(mode);
  }

  setLoopMode(): void {
    this.loopService.setLooping(!this.loopMode);
  }

  killAll(): void {
    this.killService.kill();
    this.isPlaying = false;
    this.loopService.setLooping(false);
  }
}
