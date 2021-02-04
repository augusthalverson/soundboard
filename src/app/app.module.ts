import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { FaderComponent } from './fader/fader.component';
import { ReceiverComponent } from './remote-control/receiver/receiver.component';
import { ControlsComponent } from './remote-control/controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    FaderComponent,
    ReceiverComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
