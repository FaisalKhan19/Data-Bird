let overlayVisible = false;
let overlayContainer = null;
let isHighlighting = false;

function toggleHighlight() {
  overlayVisible = !overlayVisible;
  
  if (overlayVisible) {
    injectOverlay();
  } else {
    removeOverlay();
  }

  isHighlighting = !isHighlighting;
  if (isHighlighting) {
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleMouseClick);
  } else {
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleMouseClick);
    removeHighlight();
  }
}

function handleMouseOver(event) {
  const target = event.target;
  if (target !== document && !target.classList.contains('highlight-tooltip')) {
    highlightElement(target);
    showTooltip(target);
  }
}

function handleMouseClick(event) {
  const target = event.target;
  var class_ = target.getAttribute('class')
  var tag_name = target.getAttribute('tag')
  alert(class_, tag_name)
}

function handleMouseOut(event) {
  const target = event.target;
  if (target !== document && !target.classList.contains('highlight-tooltip')) {
    unhighlightElement(target);
    hideTooltip();
  }
}

function highlightElement(element) {
  element.style.border = '2px solid red';
  element.style.backgroundColor = 'yellow';
}

function unhighlightElement(element) {
  element.style.border = '';
  element.style.backgroundColor = '';
}

function injectOverlay() {
  if (!overlayContainer) {
    overlayContainer = document.createElement('div');
    overlayContainer.id = 'custom-overlay';
    
    // Styling for the overlay container
    overlayContainer.style.position = 'fixed';
    overlayContainer.style.top = '0';
    overlayContainer.style.left = '0';
    overlayContainer.style.width = '150px';
    overlayContainer.style.height = '100px';
    overlayContainer.style.backgroundColor = 'rgba(0, 0, 128, 0.8)'; // Ocean blue
    overlayContainer.style.zIndex = '9999';
    overlayContainer.style.borderRadius = '8px';
    overlayContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    
    // Styling for the overlay content
    overlayContainer.innerHTML = `
      <div id="overlay-content" style="padding: 10px; text-align: center;">
        <p id="selected-item" style="color: white; margin-bottom: 10px;">Selected Item: <span id="item-text">None</span></p>
        <button id="confirm-button" style="background-color: #4CAF50; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Confirm</button>
        <button id="save-button" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Save</button>
      </div>
    `;
    
    // Append the overlay to the document body
    document.body.appendChild(overlayContainer);
  }
}


function removeOverlay() {
  if (overlayContainer) {
    document.body.removeChild(overlayContainer);
    overlayContainer = null;
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleHighlight') {
    toggleHighlight();
  }
});