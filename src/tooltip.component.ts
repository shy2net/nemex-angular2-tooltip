import { Component, ElementRef, Renderer, Inject } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { TooltipService } from './nemex-tooltip.service';
import { TooltipData } from './tooltip-data';

@Component({
    selector: 'tooltip',
    template: `<div class="tooltip"
                  (window:scroll)="onWindowScroll($event)"
                  (window:resize)="onWindowResize($event)"
                  style="position: absolute;"
                  [ngClass]=this.getClass()
                  [style.left.px]=this.x
                  [style.top.px]=this.y>
                  <tooltip-arrow 
                    *ngIf="isArrowVisible()" 
                    [orientation]=getArrowOrientation() 
                    [fillColor]=this.getArrowFillColor()>
                  </tooltip-arrow>

                  <div class="tooltip-wrapper">
                    <!-- Here goes the tooltip content HTML -->
                  </div>
                </div>`,
    styles: []
})
export class TooltipComponent{
  private _tooltipData: TooltipData;
  private x = 0;
  private y = 0;

  constructor(private el:ElementRef,
    private renderer:Renderer,
    private tooltipService:TooltipService,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document:any) { }

  set tooltipData(tooltipData: TooltipData) {
    this._tooltipData = tooltipData;
  }

  isArrowVisible() { 
    return this._tooltipData.showArrow; 
  }

  // Returns the tooltip arrow orientation
  getArrowOrientation() {
    switch (this._tooltipData.placement) {
      case "top": return "down";
      case "bottom": return "up";
      case "left": return "right";
      case "right": return "left";
    }
  }

  getArrowFillColor() { 
    return this._tooltipData.color; 
  }

  getClass() { return "tooltip-" + this._tooltipData.placement; }

  // Initialized the tooltip wrapper, which hold the container and the tooltip bubble arrow
  initTooltipWrapper() {
    var tooltipWrapperElement = this.getTooltipWrapperElement();
    var tooltipHtml = this._tooltipData.containerHtml;

    if (typeof tooltipHtml == "string")
      tooltipWrapperElement.innerHTML = this._tooltipData.containerHtml;
    else
      tooltipWrapperElement.appendChild(tooltipHtml);
  }

  // Initializes the tootlip container which contains all of the tooltip content
  initTooltipContainer() {
    var containerElement = this.getTooltipContainerElement();

    // Check if a container was specified
    if (containerElement) {
      var tooltipContent = this._tooltipData.content;
      containerElement.innerHTML = null;

      if (typeof tooltipContent == "string")
        containerElement.innerHTML = this._tooltipData.content;
      else
        containerElement.appendChild(tooltipContent);

      containerElement.style = this._tooltipData.style;
    }
    else {
      console.log("tooltip-container tag was not found - please add a tag containing the class tooltip-container to the custom tooltip html specified");
    }
  }

  // This is called whe component has been initialized, sets up everything required from the tooltip
  ngAfterContentInit() {
    var tooltipElement = this.getTooltipElement();
    this.initTooltipWrapper();
    this.initTooltipContainer();
    this.placeTooltip();
  }

  get tooltipData(): TooltipData { return this._tooltipData; }

  isTooltipReady() { return this._tooltipData != null; }

  public getReferencedDirective() { this._tooltipData.referencedDirective; }
  public getTooltipElement() { return this.el.nativeElement.firstElementChild; }
  public getTooltipWrapperElement() { return this.getTooltipElement().querySelector(".tooltip-wrapper");  }
  public getTooltipContainerElement() { return this.getTooltipElement().querySelector(".tooltip-container"); }

  // Update the tooltip position accordingly
  onWindowResize(event:Event) {
    this.placeTooltip();
  }

  // Update the tooltip position when window is being scrolled
  onWindowScroll(event:Event) {
    this.placeTooltip();
  }

  placeTooltip() {
    if (!this.isTooltipReady()) return;

    // Get the tooltip element graphic params
    let refElement = this._tooltipData.targetElement.nativeElement;
    var absPosition = refElement.getBoundingClientRect();
    var width = refElement.offsetWidth;
    var height = refElement.offsetHeight;

    // Get the tooltip size
    var tooltipPlacement = this._tooltipData.placement;
    var tooltipElement = this.getTooltipElement();
    var tooltipWidth = tooltipElement.offsetWidth;
    var tooltipHeight = tooltipElement.offsetHeight;

    // Calculate the offsets
    var offsets = this.calculateOffsets();

    // Place the tooltip correctly
    this.x = this.document.body.scrollLeft + absPosition.left + offsets.offsetX;
    this.y = this.document.body.scrollTop + absPosition.top + offsets.offsetY;

    // Finally place the tooltip
    switch (tooltipPlacement) {
      case 'top':
        this.x += (width / 2) - (tooltipWidth / 2);
        this.y += -tooltipHeight;
        break;
      case 'bottom':
        this.x += (width / 2) - (tooltipWidth / 2);
        this.y += height;
        break;
      case 'left':
        this.x -= tooltipWidth;
        this.y += (height / 2) - (tooltipHeight / 2);
        break;
      case 'right':
        this.x += width;
        this.y += (height / 2) - (tooltipHeight / 2);
        break;
    }

    // console.log("Tooltip positioned at: { X:" + this.x + " Y:" + this.y + " }");
  }

  // Calculates all of the offsets according
  calculateOffsets() {
    var offsetX = this._tooltipData.offsetX;
    var offsetY = this._tooltipData.offsetY;
    var tooltipDefaultOffset = this.tooltipService.defaultOffset;

    // Add default offset if not specified according to the tooltip placement
    switch (this._tooltipData.placement) {
      case 'top':
        offsetY = offsetX || -tooltipDefaultOffset;
        break;
      case 'bottom':
        offsetY = offsetY || tooltipDefaultOffset;
        break;
      case 'left':
        offsetX = offsetX || -tooltipDefaultOffset;
        break;
      case 'right':
        offsetX = offsetX || tooltipDefaultOffset;
        break;
    }

    // Use '0' if no offset was specified
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;

    return { offsetX : offsetX,
             offsetY : offsetY };
  }
}
