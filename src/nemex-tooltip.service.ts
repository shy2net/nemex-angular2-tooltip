import { Injectable } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@Injectable()
export class TooltipService {
  public defaultPlacement = 'bottom';
  public defaultOffset = 15;
  public defaultTooltipColor = '#000';
  public defaultShowArrow = true;
  public defaultMouseLeaveRadius = 15;

  public defaultTooltipStyle = `
                    background: {tooltipColor};
                    padding: 8px;
                    color: #fff;
                    border-radius: 5px`;

  public defaultTooltipHtml =
      `<div class="tooltip-container"></div>`;

  // Holds the active tooltip directive which also contains the tooltip component
  private activeTooltip:TooltipDirective;

  public setActiveTooltip(tooltip:TooltipDirective) {
    // If there is an already existing tooltip, destroy it
    if (this.activeTooltip) {
      this.activeTooltip.destroyTooltip();
      this.activeTooltip = null;
    }

    this.activeTooltip = tooltip;
  }

  public getActiveTooltip():TooltipDirective { return this.activeTooltip; }

  public hasActiveTooltip():boolean { return this.activeTooltip != null; } 
}