import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NemexTooltipModule, TooltipService } from 'nemex-angular2-tooltip';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NemexTooltipModule
  ],
  providers: [TooltipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
