import { Injectable } from '@angular/core';

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
}