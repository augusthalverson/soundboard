import { Component, Input, OnInit } from '@angular/core';
import { KillService } from '../kill-service/kill.service';
import { Sound } from '../sound.model';
import { ModeService } from '../mode-service/mode.service';
import { LoopService } from '../loop-service/loop.service';
import { VolumeService } from '../volume-service/volume.service';
import { ThrowStmt } from '@angular/compiler';
import { RemoteControlService } from '../remote-control/remote-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() sound: Sound;
  @Input() index: number;

  audio;
  isPlaying = false;
  isLoopMode = false;
  duration: string;
  restartMode = false;
  isTxMode = false;

  playSoundSubscription: Subscription;

  constructor(
    private killService: KillService,
    private modeService: ModeService,
    private loopService: LoopService,
    private volumeService: VolumeService,
    private remoteControlService: RemoteControlService
  ) {}

  ngOnInit(): void {
    this.audio = new Audio(
      '../assets/Sounds/' + this.sound.name + '/effect.mp3'
    );
    this.audio.onloadedmetadata = () => {
      this.duration = this.formatTime(Math.round(this.audio.duration));
    };

    this.killService.killSubject.subscribe(() => {
      this.audio.pause();
      this.isPlaying = false;
    });

    this.modeService.restartSubject.subscribe((newMode) => {
      this.restartMode = newMode;
    });

    this.loopService.loopSubject.subscribe((newMode) => {
      this.isLoopMode = newMode;
    });

    this.volumeService.volumeSubject.subscribe((newVolume: number) => {
      this.audio.volume = newVolume;
    });

    this.remoteControlService.isTxModeSubscription.subscribe(
      newTxMode => {
        this.isTxMode = newTxMode;
      }
    );

    this.remoteControlService.isRxModeSubscription.subscribe(
      newRxMode => {
        if (newRxMode) {
          this.playSoundSubscription = this.remoteControlService.playSoundSubject.subscribe(
            soundIndex => {
              if (soundIndex === this.index) {
                this.playSound();
              }
            }
          );
        }
      }
    );
  }

  playSound(): void {
    if (this.isTxMode) {
      console.log(`clicked sound: ${this.index}`);
      this.remoteControlService.playSound(this.index);
    } else {
      if (this.isPlaying) {
        this.audio.pause();
        if (this.restartMode === true) {
          this.audio.currentTime = 0;
          this.audio.play();
        } else {
          this.loopService.setLooping(false);
          this.isPlaying = false;
          this.killService.stopPlaying(this.sound.name);
        }
      } else {
        this.audio.currentTime = 0;
        this.audio.play();
        this.isPlaying = true;
        this.killService.addPlaying(this.sound.name);
        this.audio.onended = () => {
          if (this.isLoopMode) {
            this.audio.currentTime = 0;
            this.audio.play();
          } else {
            this.isPlaying = false;
            this.killService.stopPlaying(this.sound.name);
          }
        };
      }
    }
  }

  formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    let result = '';
    if (hours > 0) {
      result += hours + 'h';
    }
    if (minutes > 0) {
      result += minutes + 'm';
    }
    if (seconds > 0) {
      result += seconds + 's';
    }
    return result;
  }
}
