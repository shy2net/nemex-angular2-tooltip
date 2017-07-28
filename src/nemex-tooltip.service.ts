import { Injectable } from '@angular/core';

@Injectable()
export class TooltipService {
  public defaultOffset = 7;
  public defaultPlacement = 'bottom';
  public defaultMouseLeaveRadius = 10;
  public defaultTooltipColor = '#000';
  public defaultTooltipStyle = `
                      background: {defaultTooltipColor};
                      border: 1px solid #fff;
                      padding: 8px;
                      color: #fff;
                      border-radius: 5px`;

  public defaultTooltipHtml =
      `<div class="tooltip-container"></div>`;

  // Returns the default tooltip style while replacing the default tooltip color for the correct one if specified.
  public getTooltipStyle()  {
    return this.defaultTooltipStyle.replace("{defaultTooltipColor}", this.defaultTooltipColor);
  }
}
