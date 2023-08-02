function highlightElement(element) {
    element.originalStyle = element.getAttribute('style');
    element.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';  // Blue with 30% opacity
}

function unhighlightElement(element) {
    if (element.originalStyle) {
        element.style.backgroundColor = element.originalStyle;
    } else {
        element.style.backgroundColor = '';
    }
}

function indicateElement(element) {
    highlightElement(element);

    function resetHighlight() {
        unhighlightElement(element);
        element.removeEventListener('mouseleave', resetHighlight);
    }

    element.addEventListener('mouseleave', resetHighlight);
}

window.addEventListener('click', function(event) {
    var xpath = getXPath(event.target);
    alert(xpath);
});

// Function to get the XPath of an element
function getXPath(element) {
    if (!element) {
        return '';
    }

    if (element.tagName.toLowerCase() === 'html') {
        return '/html[1]';
    }

    var parentPath = getXPath(element.parentNode);
    var elementIndex = Array.prototype.indexOf.call(element.parentNode.childNodes, element) + 1;

    // If the element has an ID, use it for the XPath
    if (element.id) {
        return parentPath + '/' + element.tagName.toLowerCase() + '[@id="' + element.id + '"]';
    }

    // If the element has a unique class, use it for the XPath
    if (element.classList && element.classList.length === 1) {
        var className = element.classList[0];
        return parentPath + '/' + element.tagName.toLowerCase() + '[@class="' + className + '"][' + elementIndex + ']';
    }

    // If the element has a name attribute, use it for the XPath
    if (element.hasAttribute('name')) {
        var name = element.getAttribute('name');
        return parentPath + '/' + element.tagName.toLowerCase() + '[@name="' + name + '"][' + elementIndex + ']';
    }

    // If none of the above, use the element's position in its parent as part of the XPath
    return parentPath + '/' + element.tagName.toLowerCase() + '[' + elementIndex + ']';
}
