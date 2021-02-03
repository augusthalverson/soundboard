import { Component, OnInit } from '@angular/core';
import { VolumeService } from '../volume-service/volume.service';

@Component({
  selector: 'app-fader',
  templateUrl: './fader.component.html',
  styleUrls: ['./fader.component.scss'],
})
export class FaderComponent implements OnInit {
  constructor(private volumeService: VolumeService) {}

  ngOnInit(): void {}

  sliderChanged(value) {
    this.volumeService.volume = (100 - value) / 100;
  }
}
