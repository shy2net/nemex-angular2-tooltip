# Advanced Angular 2 Tooltip

This module allows creating angular 2 tooltips easily.
It features the following:
- Control of tooltip placements.
- Tooltip with HTML content support! (including buttons)
- Global and specific styling for each tooltip.
- Advanced configurations.
- Easy to use yet highly configurable.

![Angular2 tooltip example](https://github.com/shy2net/nemex-angular2-tooltip/raw/master/example/tooltip-example-jpg.jpg)

This package contains an example usage with the following tooltips:
![Angular2 tooltip example](https://github.com/shy2net/nemex-angular2-tooltip/raw/master/example/tooltip-example-gif.gif)

## Tooltip installation
Install the package using the following command:
> npm install nemex-angular2-tooltip --save

In your app module add the following code:
```typescript
...
import { NemexTooltipModule, TooltipService } from 'nemex-angular2-tooltip';

@NgModule({
  ...
  // Import the module in order to add the tooltip directive
  imports: [
    ...
    NemexTooltipModule
  ],
  // Add the tooltip service to your list of providers in order to easily configure it globally
  providers: [ 
    ...
    TooltipService
  ],
  ...
})
```

Now to your component html add the following:
```html
<div tooltip tooltipContent="I'm a nice tooltip!">
    ...
</div>
```

If you want to use HTML inside of your tooltip, use the following:
```html
<div tooltip>
    <div class="tooltip-content">
        <!-- Any custom content goes here -->
        <button>Just a simple tooltip button!</button>
    </div>
    ...
</div>
```

## Advanced features
The tooltip can be customized using simple properties such as:
```html
<!-- Creates a tooltip positioned to the right of the element -->
<div tooltip tooltipContent="Hello there!" tooltipPlacement="right">
    ...
</div>
```
This tooltip supports the following properties:
- **tooltipContent** - the content string to show in the tooltip. If you want to render out HTML, simply add a tag inside of your HTML element with the class "tooltip-content".
- **tooltipPlacement** - the position to place the tooltip relative to the element.
- **tooltipOffsetX, tooltipOffsetY** - the number of pixels to add between the element to the tooltip.
- **tooltipColor** - the default color of the container tooltip.
- **tooltipShowArrow** - If set to false, no arrow will be shown next to tooltip.
- **tooltipLeaveRadius** - the radius the mouse is allowed to leave out of the element and the tooltip still visible.
- **tooltipStyle** - the style to use for the tooltip.
- **tooltipHtml** - the container html for the tooltip.

## Editing the default configurations
You can edit the default tooltip configurations easily, by simply accessing the TooltipService and editing the following members:
- **defaultPlacement** - the default placement of the tooltip (top, bottom, left, right).
- **defaultOffset** - the default number of pixels the tooltip is far from the element.
- **defaultTooltipColor** - the default color of the container tooltip.
- **defaultTooltipShowArrow** - By default, sets if the tooltip arrow will be shown or not (set to true).
- **defaultMouseLeaveRadius** - the default radius the mouse is allowed to leave out of the leement and the tooltip still visible.
- **defaultTooltipStyle** - the default style the tooltip.
- **defaultTooltipHtml** - the default tooltip container html. You must specify a tag with the "tooltip-container" for the tooltip to populate the content into.

An example of editing the default tooltip style is by injecting the service into the app component:
```typescript
import { Component } from '@angular/core';
import { TooltipService } from 'nemex-angular2-tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public constructor(private tooltipService:TooltipService) {
    tooltipService.defaultTooltipStyle =
      `background: #000;
       color: #fff;
       padding: 5px;`;
  }
}
```
