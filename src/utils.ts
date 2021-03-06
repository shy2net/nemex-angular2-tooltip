export const isMouseInBounds = function(event:MouseEvent, el:HTMLElement, leaveRadius:number, document:Document) {
  var mouseX = document.body.scrollLeft + event.clientX;
  var mouseY = document.body.scrollTop + event.clientY;

  var elementX = el.offsetLeft;
  var elementWidth = el.offsetWidth;
  var elementY = el.offsetTop;
  var elementHeight = el.offsetHeight;

  return mouseX >= (elementX - leaveRadius) &&
        mouseX <= (elementX + elementWidth + leaveRadius) &&
        mouseY >= (elementY - leaveRadius) &&
        mouseY <= (elementY + elementHeight + leaveRadius);
};