let overlayVisible = false;
let overlayContainer = null;
let isHighlighting = false;

function toggleHighlight(toggleHighlightButton) {

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
  if (target !== document && !target.classList.contains('overlay69') && target !== selectedElement) {
    highlightElement(target);
  }
}

function updateSelectedItemDisplay() {
  const selectedItemDisplay = document.getElementById('item-text69');

  if (selectedElement) {
    selectedItemDisplay.textContent = `${selectedElement.className} ${selectedElement.tagName.toLowerCase()}`;
  } else {
    selectedItemDisplay.textContent = 'None';
  }
}

const indicated_list = {};

let selectedElement = null;

function handleMouseClick(event) {

  const target = event.target;
  if (target.getAttribute('id') == 'save-button') {
    saveJsonToFile(indicated_list, 'indicated.json')
    unhighlightElement(selectedElement);
  }

  // Handle confirming the selected element and saving to indicated_list
  if (target.getAttribute('id') == 'confirm-button') {
    if (selectedElement) {
      indicated_list[selectedElement.className] = selectedElement.tagName.toLowerCase();
      unhighlightElement(selectedElement); // Remove highlight from the element
      selectedElement = null;
      updateSelectedItemDisplay();
    }
  }

  // if (selectedElement && selectedElement!==target) {
  //   unhighlightElement(selectedElement);
  // }

  // Set the clicked element as the selected element if it's not an overlay element
  if (!selectedElement && !target.classList.contains('overlay69')) {
    selectedElement = target;
    highlightElement(selectedElement);
    updateSelectedItemDisplay();
  }
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
  if (target !== document && !target.classList.contains('overlay69') && target !== selectedElement) {
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

function hierarchyUPnav() {
  if (selectedElement) {
    const parent = selectedElement.parentElement;
    if (parent) {
      unhighlightElement(selectedElement);
      selectedElement = parent;
      highlightElement(selectedElement);
      updateSelectedItemDisplay();
    }
  }
};

function hierarchyDOWNnav() {
  if (selectedElement) {
    const child = selectedElement.querySelector('*');
    if (child) {
      unhighlightElement(selectedElement);
      selectedElement = child;
      highlightElement(selectedElement);
      updateSelectedItemDisplay();
    }
  }
}

function highlightSimilar() {
  if (selectedElement) {
    const className = selectedElement.className;
    const similarElements = document.querySelectorAll(`.${className}`);
    similarElements.forEach(element => {
      highlightElement(element);
    });
  }
}

function injectOverlay() {
  if (!overlayContainer) {
    overlayContainer = document.createElement('div');
    overlayContainer.id = 'custom-overlay';
    overlayContainer.className = 'overlay69 container69'

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
      <div id="overlay-content" class="overlay69 container69" style="padding: 10px; text-align: center;">
        <p id="selected-item" class="overlay69 para69" style="color: white; margin-bottom: 10px;">Selected Item: <span id="item-text69">None</span></p>
        <button id="confirm-button" class="overlay69 button69" style="background-color: #4CAF50; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; margin-right: 5px;">Confirm</button>
        <button id="save-button" class="overlay69 button69" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Save</button>
        <button id="toggleHighlight-button" class="overlay69 button69" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Activate Highlight</button>
        <div id = "overlay-content" class="overlay69 container69 hierarchy-control>
          <button id="hier-up" class="overlay69 button69" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Parent</button>
          <button id="hier-down" class="overlay69 button69" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Child</button>
        </div>
        <button id="show-similar" class="overlay69 button69" style="background-color: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">Show Similar</button>
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
    toggleHighlightButton.addEventListener('click', function () {
      toggleHighlight(toggleHighlightButton);
    });
    const hierarchyUpButton = overlayContainer.getElementById('hier-up');
    const hierarchyDownButton = overlayContainer.getElementById('hier-down');
    const showSimilarButton = overlayContainer.getElementById('show-similar');

    hierarchyUpButton.addEventListener('click', function() {
      hierarchyUPnav();
    });

    hierarchyDownButton.addEventListener('click', function() {
      hierarchyDOWNnav();
    });

    showSimilarButton.addEventListener('click',function () {
      highlightSimilar();
    });
  }
}


function removeOverlay() {
  if (overlayContainer) {
    document.body.removeChild(overlayContainer);
    overlayContainer = null;
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggleHighlight') {
    toggleOverlay();
  }
});