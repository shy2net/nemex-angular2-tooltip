export const isMouseInBounds = function(event, el, leaveRadius) {
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  var elementX = el.offsetLeft;
  var elementWidth = el.offsetWidth;
  var elementY = el.offsetTop;
  var elementHeight = el.offsetHeight;

  return mouseX >= (elementX - leaveRadius) &&
        mouseX <= (elementX + elementWidth + leaveRadius) &&
        mouseY >= (elementY - leaveRadius) &&
        mouseY <= (elementY + elementHeight + leaveRadius);
};
