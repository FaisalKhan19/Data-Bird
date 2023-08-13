let isHighlighting = false;

function toggleHighlight() {
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
  alert(class_)
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


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleHighlight') {
    toggleHighlight();
  }
});