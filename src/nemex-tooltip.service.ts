import { Injectable } from '@angular/core';

@Injectable()
export class TooltipService {
  public defaultOffset = 10;
  public defaultPlacement = 'bottom';
  public defaultMouseLeaveRadius = 20;
  public defaultTooltipStyle = `
                      background: #000;
                      border: 1px solid #fff;
                      padding: 8px;
                      color: #fff;
                      -webkit-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.75);
                      -moz-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.75);
                      box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.75);`;

  public defaultTooltipHtml = `<div class="tooltip-container"></div>`;
}
