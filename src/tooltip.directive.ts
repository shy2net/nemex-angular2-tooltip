import { Component,Directive,Inject, ComponentFactoryResolver, OnInit,
          AfterContentChecked,Input,Output, ElementRef, Renderer,
          ViewContainerRef,ComponentRef, EventEmitter } from '@angular/core';
import { TooltipService } from './nemex-tooltip.service';
import { TooltipComponent } from './tooltip.component';
import { TooltipData } from './tooltip_data';
import { DOCUMENT } from '@angular/platform-browser';
import * as util from './utils';

@Directive({
  selector: '[tooltip]',
  host: {
    '(mouseover)': 'onMouseHover($event)',
    '(click)': 'onClick($event)',
  }
})
export class TooltipDirective {
   @Input() public tooltipContent: string;
   @Input() public tooltipPlacement: string;
   @Input() public tooltipOffsetX: number;
   @Input() public tooltipOffsetY: number;
   @Input() public tooltipColor: string;
   @Input() public tooltipShowArrow: boolean;
   @Input() public tooltipLeaveRadius: number;
   @Input() public tooltipStyle: string;
   @Input() public tooltipHtml: any;
   
   private tooltipComponent;

   // The mouse move bind handler
   private mouseMoveBind;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
       private viewContainerRef: ViewContainerRef,
       private el:ElementRef,
       private renderer:Renderer,
       private tooltipService:TooltipService,
       @Inject(DOCUMENT) private document:any) {

    }

    ngAfterContentInit() {
      var tooltipContentTag = this.el.nativeElement.querySelector('.tooltip-content');
      this.tooltipContent = (tooltipContentTag != null) ? tooltipContentTag : this.tooltipContent;
      var tooltipHtmlTag = this.el.nativeElement.querySelector('.tooltip-html');
      this.tooltipHtml = (tooltipHtmlTag != null) ? tooltipHtmlTag : (this.tooltipHtml || this.tooltipService.defaultTooltipHtml);

      // If the tooltip customization html tag is present, remove it
      if (tooltipHtmlTag) tooltipHtmlTag.remove();

      // Remove the tooltip content tag if exists
      if (tooltipContentTag) tooltipContentTag.remove();
    }

    // Returns the tooltip style set while replacing the tooltip color within it if specified (comes with the defaultTooltipStyle).
    public getTooltipStyle()  {
      var style = (this.tooltipStyle != undefined) ?  this.tooltipStyle : this.tooltipService.defaultTooltipStyle;
      return style.replace("{tooltipColor}", this.tooltipColor || this.tooltipService.defaultTooltipColor);
    }

    createTooltip(event:any) {
      if (!this.tooltipContent)
        throw new Error("tooltipContent is missing!");

      var showArrow = this.tooltipService.defaultShowArrow;
      if (this.tooltipShowArrow != undefined) showArrow = this.tooltipShowArrow;

      let tooltipData = {
        eventX: event.clientX,
        eventY: event.clientY,
        offsetX:  Number(this.tooltipOffsetX),
        offsetY: Number(this.tooltipOffsetY),
        style: this.getTooltipStyle(),
        placement: this.tooltipPlacement || this.tooltipService.defaultPlacement,
        containerHtml: this.tooltipHtml || this.tooltipService.defaultTooltipHtml,
        color: this.tooltipColor || this.tooltipService.defaultTooltipColor,
        showArrow: showArrow,
        targetElement: this.el,
        content: this.tooltipContent
      };

      // Get the default mouse leave radius if not specified
      this.tooltipLeaveRadius = this.tooltipLeaveRadius || this.tooltipService.defaultMouseLeaveRadius;

      // Create the tooltip component using the component factory
      const factory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
      const elementRef = this.viewContainerRef.createComponent(factory);
      this.tooltipComponent = elementRef;

      // Attach the tooltip to the body
      this.document.querySelector('body').appendChild(elementRef.location.nativeElement);
      elementRef.instance.tooltipData = tooltipData;

      // Create a mousemove bind, to know when the user left the element
      this.mouseMoveBind = this.onWindowMouseMove.bind(this); // We need the context of this
      this.document.addEventListener('mousemove', this.mouseMoveBind);
    }

    // Called when the mouse is hovering our element
    onMouseHover(event:any) {
      if (!this.tooltipComponent)
        this.createTooltip(event);
    }

    // By listening to the mouse move on the window we can detect when the user left the element
    // with the leave radius specified, we use this instead of mouseleave event as it does not allow
    // us to handle the extras leave radius we created
    onWindowMouseMove(event) {
      if (!this.tooltipComponent) return;
      var tooltipElement = this.tooltipComponent.instance.getTooltipElement();

      var isMouseInsideElement = util.isMouseInBounds(event,
                                this.el.nativeElement,
                                this.tooltipLeaveRadius,
                                this.document);

      var isMouseInsideTooltip = isMouseInsideElement ||
                                  util.isMouseInBounds(event,
                                    tooltipElement, 0,
                                    this.document);

      // Check if the user is in the bounds of the element or the tooltip
      if (isMouseInsideElement || isMouseInsideTooltip) {
        // Dont do anything if the mouse is inside the element or the tooltip
      }
      else {
        // Destroy the tooltip as we don't need it anymore
        this.tooltipComponent.destroy();

        // Stop binding as the tooltip does not exist anymore
        document.removeEventListener('mousemove', this.mouseMoveBind);

        // Allow the tooltip be recreated
        this.tooltipComponent = null;
      }
    }
}
