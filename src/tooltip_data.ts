import { Component, ElementRef } from "@angular/core";

export interface TooltipData {
  eventX: number,
  eventY: number,
  offsetX: number,
  offsetY: number,
  placement: string,
  style: string,
  targetElement: ElementRef,
  content: any
}
