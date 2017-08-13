import { Component, ElementRef, Renderer, Inject, Input } from '@angular/core';
import { TooltipService } from './nemex-tooltip.service';

@Component({
    selector: 'tooltip-arrow',
    template: `<div *ngIf="orientation == 'up'" class="tooltip-arrow-up">
                    <svg width="35" height="10" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g id="svg_1">
                            <path id="svg_4" d="m2.315921,10.092586l30.36816,0l-15.33592,-8.65182l-15.03224,8.65182z" [attr.fill]="getFillColor()" stroke="null"/>
                            </g>
                        </g>
                    </svg>
                </div>

                <div *ngIf="orientation == 'down'" class="tooltip-arrow-down">
                    <svg width="35" height="10" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g transform="rotate(180 17.5,4.166677951812744) " id="svg_1">
                                <path id="svg_4" d="m2.315921,8.492588l30.36816,0l-15.33592,-8.65182l-15.03224,8.65182z" [attr.fill]="getFillColor()" stroke="null"/>
                            </g>
                        </g>
                    </svg>
                </div>
                
                <div *ngIf="orientation == 'left'" class="tooltip-arrow-left">
                    <svg width="11" height="26" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g id="svg_2">
                                <g stroke="null" transform="rotate(-90 5.886415481567384,13.024868965148926) " id="svg_1">
                                    <path stroke="null" [attr.fill]="getFillColor()" d="m-7.161923,18.181367l26.09668,0l-13.17882,-10.31295l-12.91786,10.31295z" id="svg_4"/>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>

                <div *ngIf="orientation == 'right'" class="tooltip-arrow-right">
                    <svg width="11" height="26" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g transform="rotate(180 5.1288628578186035,13.024867057800293) " id="svg_2">
                                <g stroke="null" transform="rotate(-90 5.1288394927978525,13.024868965148926) " id="svg_1">
                                    <path stroke="null" [attr.fill]="getFillColor()" d="m-7.919499,18.181367l26.09668,0l-13.17882,-10.31295l-12.91786,10.31295z" id="svg_4"/>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>`,
    styles: [`
      .tooltip-arrow-up {
        position: absolute;
        top: -13px;
        left: 50%;
        margin-left: -17.5px;
      }

      .tooltip-arrow-down {
        position: absolute;
        bottom: -13px;
        left: 50%;
        margin-left: -17.5px;
      }

      .tooltip-arrow-right {
        position: absolute;
        right: -10px;
        top: 50%;
        margin-top: -13px;
      }

      .tooltip-arrow-left {
        position: absolute;
        left: -10px;
        top: 50%;
        margin-top: -13px;
      }
    `]
})
export class TooltipArrowComponent {
    @Input() public orientation = "up";
    @Input() public fillColor: any;

    public constructor(private _el: ElementRef,
        private tooltipService: TooltipService) {
    }

    getFillColor() { return this.fillColor || this.tooltipService.defaultTooltipColor; }
}