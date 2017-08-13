import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';

import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@Injectable()
export class TooltipService {
  @Output() public onTooltipShow = new EventEmitter<TooltipDirective>();
  @Output() public onTooltipHide = new EventEmitter<TooltipDirective>();

  // The tooltip subscription to hide and show events
  private onTooltipShowSub:Subscriber<TooltipDirective>;
  private onTooltipHideSub:Subscriber<TooltipDirective>;

  public defaultPlacement = 'bottom';
  public defaultEffect = 'fade';
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
      this.onTooltipShowSub.unsubscribe();
    }

    this.activeTooltip = tooltip;

    if (tooltip) {
      this.onTooltipShowSub = tooltip.onTooltipShow.subscribe(this.onActiveTooltipShown.bind(this));
      this.onTooltipHideSub = tooltip.onTooltipHide.subscribe(this.onActiveTooltipHidden.bind(this));
    }
  }

  private onActiveTooltipShown(tooltip:TooltipDirective) {
      this.onTooltipShow.emit(tooltip);
  }

  private onActiveTooltipHidden(tooltip:TooltipDirective) {
      this.onTooltipHide.emit(tooltip);

      /* The tooltip has been destroyed, unsubscribe from events from it.
      We re-subscribe for the tooltip using the setActiveTooltip method */
      this.onTooltipHideSub.unsubscribe();
  }

  public getActiveTooltip():TooltipDirective { return this.activeTooltip; }

  public hasActiveTooltip():boolean { return this.activeTooltip != null; }
}
