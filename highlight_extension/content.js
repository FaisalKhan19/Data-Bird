let overlayVisible = false;
let overlayContainer = null;
let isHighlighting = false;

function toggleHighlight(toggleHighlightButton) {
  // overlayVisible = !overlayVisible;
  
  // if (overlayVisible) {
  //   injectOverlay();
  // } else {
  //   removeOverlay();
  // }

  isHighlighting = !isHighlighting;
  if (isHighlighting) {
    toggleHighlightButton.textContent = 'Stop Highlighting';
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleMouseClick);
  } else {
    toggleHighlightButton.textContent = 'Activate Highlighting';
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('click', handleMouseClick);
    removeHighlight();
  }
}

function toggleOverlay() {
  overlayVisible = !overlayVisible;
  
  if (overlayVisible) {
    injectOverlay();
  } else {
    removeOverlay();
  }

}


function handleMouseOver(event) {
  const target = event.target;
  if (target !== document && !target.classList.contains('overlay')) {
    highlightElement(target);
  }
}

const indicated_list = {};

function handleMouseClick(event) {
  const target = event.target;
  if (target.getAttribute('id') == 'save-button') {
    saveJsonToFile(indicated_list,'indicated.json')
  }
  const class_ = target.getAttribute('class');
  const tag_name = target.getAttribute('tag_name');
  indicated_list[class_] = tag_name;
  // alert(class_, tag_name)
}

function saveJsonToFile(data, filename) {
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonBlob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.textContent = 'Download JSON';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handleMouseOut(event) {
  const target = event.target;
  if (target !== document && !target.classList.contains('overlay')) {
    unhighlightElement(target);
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
    overlayContainer.className = 'overlay container'
    
    // Styling for the overlay container
    overlayContainer.style.position = 'fixed';
    overlayContainer.style.top = '10px';
    overlayContainer.style.right = '10px';
    overlayContainer.style.width = '200px';
    overlayContainer.style.height = '200px';
    overlayContainer.style.backgroundColor = 'rgba(0, 0, 128, 0.8)'; // Ocean blue
    overlayContainer.style.zIndex = '9999';
    overlayContainer.style.borderRadius = '8px';
    overlayContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    
    // Styling for the overlay content
    overlayContainer.innerHTML = `
      <div id="overlay-content" class="overlay div" style="padding: 10px; text-align: center;">
        <p id="selected-item" class="overlay para" style="color: white; margin-bottom: 10px;">Selected Item: <span id="item-text">None</span></p>
        <button id="confirm-button" class="overlay button" style="background-color: #4CAF50; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Confirm</button>
        <button id="save-button" class="overlay button" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Save</button>
        <button id="toggleHighlight-button" class="overlay button" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Activate Highlight</button>
      </div>
    `;
    
    let isDragging = false;
    let offsetX, offsetY;
    
    overlayContainer.addEventListener('mousedown', (event) => {
      isDragging = true;
      offsetX = event.clientX - overlayContainer.getBoundingClientRect().left;
      offsetY = event.clientY - overlayContainer.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        overlayContainer.style.left = `${event.clientX - offsetX}px`;
        overlayContainer.style.top = `${event.clientY - offsetY}px`;
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Append the overlay to the document body
    document.body.appendChild(overlayContainer);
    const toggleHighlightButton = document.getElementById('toggleHighlight-button');
    toggleHighlightButton.addEventListener('click', toggleHighlight(toggleHighlightButton));
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
    toggleOverlay();
  }
});