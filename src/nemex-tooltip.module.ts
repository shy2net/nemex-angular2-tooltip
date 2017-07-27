import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { TooltipService } from './nemex-tooltip.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TooltipDirective, TooltipComponent],
    exports: [TooltipDirective],
    providers: [TooltipService],
    entryComponents: [TooltipComponent]
})
export class NemexTooltipModule { }
