import { Component, ElementRef } from "@angular/core";

export interface TooltipData {
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