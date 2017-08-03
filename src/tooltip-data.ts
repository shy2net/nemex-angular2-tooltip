import { Component, ElementRef } from "@angular/core";
import { TooltipDirective } from './tooltip.directive';

export interface TooltipData {
  referencedDirective: TooltipDirective,
  eventX: number,
  eventY: number,
  offsetX: number,
  offsetY: number,
  placement: string,
  containerHtml: any,
  style: string,
  showArrow: boolean,
  color: string,
  targetElement: ElementRef,
  content: any
}