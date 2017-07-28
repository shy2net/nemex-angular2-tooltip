import { Component } from '@angular/core';
import { TooltipService } from 'nemex-angular2-tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private tooltipService:TooltipService) {
	// This is an example of how to setup the tooltip color
    this.tooltipService.defaultTooltipColor = "#000";
  }

  title = 'app';
}