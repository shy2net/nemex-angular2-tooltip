import { Injectable } from '@angular/core';

@Injectable()
export class TooltipService {
  public defaultOffset = 15;
  public defaultPlacement = 'bottom';
  public defaultMouseLeaveRadius = 15;
  public defaultTooltipColor = '#000';
  public defaultShowArrow = true;
  public defaultTooltipStyle = `
                      background: {tooltipColor};
                      border: 1px solid #fff;
                      padding: 8px;
                      color: #fff;
                      border-radius: 5px`;

  public defaultTooltipHtml =
      `<div class="tooltip-container"></div>`;
}
