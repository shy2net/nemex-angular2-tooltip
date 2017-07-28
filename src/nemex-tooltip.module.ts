import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipArrowComponent } from './tooltip-arrow.component';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './nemex-tooltip.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, TooltipArrowComponent, TooltipComponent],
    exports: [TooltipDirective, TooltipArrowComponent],
    providers: [TooltipService],
    entryComponents: [TooltipComponent]
})
export class NemexTooltipModule { }
