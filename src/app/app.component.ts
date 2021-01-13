import { Component, OnInit } from '@angular/core';
import { Sound } from './sound.model';
import { KillService } from './kill-service/kill.service';
import { ThrowStmt } from '@angular/compiler';
import { ModeService } from './mode-service/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'soundboard';

  restartMode = true;

  sounds: Sound[] = [
    {
      name: 'I am back',
      color: 'rgb(68,15,53)',
      label: 'white',
    },
    {
      name: 'Breaking News',
      color: 'rgb(124,0,47)',
      label: 'white',
    },
    {
      name: 'OHH',
      color: 'rgb(183,0,43)',
      label: 'black',
    },
    {
      name: 'This is exactly what',
      color: 'rgb(252,62,40)',
      label: 'black',
    },
    {
      name: 'BRAMM',
      color: 'rgb(254,184,8)',
      label: 'black',
    },
    {
      name: 'Duh duh duh',
      color: 'rgb(68,15,53)',
      label: 'white',
    },
    {
      name: 'Laugh 1',
      color: 'rgb(124,0,47)',
      label: 'white',
    },
    {
      name: 'Applause 1',
      color: 'rgb(183,0,43)',
      label: 'black',
    },
    {
      name: 'Jeopardy',
      color: 'rgb(252,62,40)',
      label: 'black',
    },
    {
      name: 'Airhorn',
      color: 'rgb(254,184,8)',
      label: 'black',
    },
    {
      name: 'Careless Whisper',
      color: 'rgb(68,15,53)',
      label: 'white',
    },
    {
      name: 'Crickets',
      color: 'rgb(124,0,47)',
      label: 'white',
    },
    {
      name: 'Lets get it on',
      color: 'rgb(183,0,43)',
      label: 'black',
    },
    {
      name: 'Ba Dum Tsss',
      color: 'rgb(252,62,40)',
      label: 'black',
    },
    {
      name: 'Gasp',
      color: 'rgb(254,184,8)',
      label: 'black',
    },
    {
      name: 'Awww',
      color: 'rgb(68,15,53)',
      label: 'white',
    },
    {
      name: 'Daddy Chill',
      color: 'rgb(124,0,47)',
      label: 'white',
    },
    {
      name: 'What the hell is even that',
      color: 'rgb(183,0,43)',
      label: 'black',
    },
    {
      name: 'Home Depot',
      color: 'rgb(252,62,40)',
      label: 'black',
    },
    {
      name: 'John Cena',
      color: 'rgb(254,184,8)',
      label: 'black',
    },
    {
      name: 'What did he say',
      color: 'rgb(68,15,53)',
      label: 'white',
    },
    {
      name: 'Gotcha Bitch',
      color: 'rgb(124,0,47)',
      label: 'white',
    }
  ];

  constructor(private killService: KillService, private modeService: ModeService) {}

  ngOnInit(): void {
    this.modeService.restartSubject.subscribe(
      newMode => {
        this.restartMode = newMode;
      }
    )
  }

  setRestartMode(mode: boolean): void {
    this.modeService.setRestartMode(mode);
  }

  killAll(): void {
    this.killService.kill();
  }
}
