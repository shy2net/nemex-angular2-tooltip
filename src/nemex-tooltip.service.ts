import { Injectable } from '@angular/core';

@Injectable()
export class TooltipService {
  public defaultOffset = 7;
  public defaultPlacement = 'bottom';
  public defaultMouseLeaveRadius = 10;
  public defaultTooltipStyle = `
                      background: #000;
                      border: 1px solid #fff;
                      padding: 8px;
                      color: #fff;`;

  public defaultTooltipHtml =
      `<div class="tooltip-container">

      </div>`;
}
