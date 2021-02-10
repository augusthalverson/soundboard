import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RemoteControlService } from '../remote-control.service';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.scss'],
})
export class EnterPinComponent implements OnInit, AfterViewInit {
  @ViewChild('input0', { static: false, read: ElementRef })
  inputZero: ElementRef;
  @ViewChild('input1', { static: false, read: ElementRef })
  inputOne: ElementRef;
  @ViewChild('input2', { static: false, read: ElementRef })
  inputTwo: ElementRef;
  @ViewChild('input3', { static: false, read: ElementRef })
  inputThree: ElementRef;

  inputs: ElementRef[] = [];

  pin: number;

  constructor(private remoteControlService: RemoteControlService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.inputs = [
      this.inputZero,
      this.inputOne,
      this.inputTwo,
      this.inputThree,
    ];
    this.inputZero.nativeElement.focus();
  }

  handleInputChange(id: number): void {
    if (this.inputs[id].nativeElement.value === 'e') {
      this.inputs[id].nativeElement.value = '';
    }
    let pinString = '';
    this.inputs.forEach((input) => {
      pinString += input.nativeElement.value;
    });
    this.pin = Number.parseInt(pinString, 10);

    if (this.inputs[id].nativeElement.value > 0) {
      if (id < 3 && id >= 0) {
        this.inputs[id + 1].nativeElement.focus();
      }
    }

    if (this.pin.toString().length === 4) {
      this.remoteControlService.setPin(this.pin);
      this.remoteControlService.isEnterPinMode = false;
      this.remoteControlService.isTxMode = true;
      console.log(this.pin);
    }
  }

  handleDelete(event: KeyboardEvent, id: number): void {
    if (event.code === 'Backspace') {
      if (id > 0) {
        this.inputs[id - 1].nativeElement.focus();
      }
    }
  }

  handleCancel(): void {
    this.remoteControlService.isEnterPinMode = false;
  }

  handleActivateTransmitMode(): void {
    this.remoteControlService.setPin(this.pin);
    this.remoteControlService.isEnterPinMode = false;
    this.remoteControlService.isTxMode = true;
  }
}
