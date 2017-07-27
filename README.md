# Advanced Angular 2 Tooltip

This module allows creating angular 2 tooltips easily.
It features the following:
- Control of tooltip placements.
- Tooltip with HTML content support! (including buttons)
- Global and specific styling for each tooltip.

## How to add this tooltip?
In your app module add the following code:
```typescript
...
import { NemexTooltipModule, TooltipService } from 'nemex-tooltip';

@NgModule({
  ...
  imports: [
    NemexTooltipModule
  ],
  providers: [ TooltipService],
  ...
})
```

Now to your component html add the following:
```html
<div tooltip tooltip-content="I'm a nice tooltip!">
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
