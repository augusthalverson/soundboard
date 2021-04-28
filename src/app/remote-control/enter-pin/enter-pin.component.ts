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

  pinNumber: number;
  pin: string;

  constructor(private remoteControlService: RemoteControlService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.inputs = [
      this.inputZero,
      this.inputOne,
      this.inputTwo,
      this.inputThree,
    ];
    // this.inputs.forEach((input) => {
    //   this.setInputFilter(input.nativeElement, (value) => {
    //     return /^\d$/.test(value); });
    // });
    this.inputZero.nativeElement.focus();
  }

  handleInputChange(id: number): void {
    // Don't allow "e"
    this.pin = '';
    this.inputs.forEach((input) => {
      this.pin += input.nativeElement.value;
    });

    if (this.inputs[id].nativeElement.value.length > 0) {
      if (id < 3 && id >= 0) {
        this.inputs[id + 1].nativeElement.focus();
      }
    }
    if (this.pin.toString().length === 4) {
      this.remoteControlService.setPin(this.pin);
      this.remoteControlService.isEnterPinMode = false;
      this.remoteControlService.isTxMode = true;
    }
    if (this.inputs[id].nativeElement.value >= 0) {
      if (id < 3 && id >= 0) {
        this.inputs[id + 1].nativeElement.focus();
      }
    }
  }

  handleDelete(event: KeyboardEvent, id: number): boolean {
    if (event.code === 'Backspace') {
      if (id > 0) {
        if (id === 3) {
          if (this.inputs[3].nativeElement.value === '') {
            this.inputs[2].nativeElement.focus();
          } else {
            this.inputs[id - 1].nativeElement.focus();
            this.inputs[id].nativeElement.value = '';
          }
        } else {
          this.inputs[id].nativeElement.value = '';
          this.inputs[id - 1].nativeElement.focus();
        }
      } else if (id === 0) {
        this.inputs[id].nativeElement.value = '';
      }
      return false;
    }
    return true;
  }

  handleCancel(): void {
    this.remoteControlService.isEnterPinMode = false;
  }

  handleActivateTransmitMode(): void {
    this.remoteControlService.setPin(this.pin);
    this.remoteControlService.isEnterPinMode = false;
    this.remoteControlService.isTxMode = true;
  }

  //   // Restricts input for the given textbox to the given inputFilter.
  //   setInputFilter(input: HTMLInputElement, inputFilter): void {
  //     [
  //       'input',
  //       'keydown',
  //       'keyup',
  //       'mousedown',
  //       'mouseup',
  //       'select',
  //       'contextmenu',
  //       'drop',
  //     ].forEach((event) => {
  //       input.addEventListener(event, () => {
  //         if (inputFilter(input.value)) {
  //           input.oldValue = input.value;
  //           input.oldSelectionStart = input.selectionStart;
  //           input.oldSelectionEnd = input.selectionEnd;
  //         } else if (input.hasOwnProperty('oldValue')) {
  //           input.value = input.oldValue;
  //           input.setSelectionRange(input.oldSelectionStart, input.oldSelectionEnd);
  //         } else {
  //           input.value = '';
  //         }
  //       });
  //     });
  //   }
}
