import { Component, Input, OnInit } from '@angular/core';
import { KillService } from '../kill-service/kill.service';
import { Sound } from '../sound.model';
import { ModeService } from '../mode-service/mode.service';
import { LoopService } from '../loop-service/loop.service';

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

  constructor(
    private killService: KillService,
    private modeService: ModeService,
    private loopService: LoopService
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
  }

  playSound(): void {
    if (this.isPlaying) {
      this.audio.pause();
      if (this.restartMode === true) {
        this.audio.currentTime = 0;
        this.audio.play();
      } else {
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
