// Get a reference to the element
var element = arguments[0];

// Store the original style attributes for later restoration
var originalStyle = element.getAttribute('style');

// Apply highlighting styles
element.style.border = '2px solid red';
element.style.backgroundColor = 'yellow';
element.style.zIndex = '9999';

// Create a tooltip to display the class name
var tooltip = document.createElement('div');
tooltip.style.position = 'fixed';
tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
tooltip.style.color = 'white';
tooltip.style.padding = '5px';
tooltip.style.zIndex = '10000';
tooltip.style.fontFamily = 'Arial, sans-serif';
tooltip.style.fontSize = '12px';
tooltip.style.borderRadius = '3px';
tooltip.style.visibility = 'hidden';
tooltip.style.opacity = '0';
tooltip.style.transition = 'opacity 0.3s';
tooltip.textContent = 'Class: ' + element.className;

// Attach the tooltip to the body
document.body.appendChild(tooltip);

// Show tooltip on hover
element.addEventListener('mouseover', function () {
  tooltip.style.visibility = 'visible';
  tooltip.style.opacity = '1';
});

// Hide tooltip when not hovered
element.addEventListener('mouseout', function () {
  tooltip.style.visibility = 'hidden';
  tooltip.style.opacity = '0';
});

// Return the class name of the element
return element.className;
