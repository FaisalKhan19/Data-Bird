// function highlightElement(element) {
//     element.originalStyle = element.getAttribute('style');
//     element.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';  // Blue with 30% opacity
// }

// function unhighlightElement(element) {
//     if (element.originalStyle) {
//         element.style.backgroundColor = element.originalStyle;
//     } else {
//         element.style.backgroundColor = '';
//     }
// }

// function indicateElement(element) {
//     highlightElement(element);

//     function resetHighlight() {
//         unhighlightElement(element);
//         element.removeEventListener('mouseleave', resetHighlight);
//     }

//     element.addEventListener('mouseleave', resetHighlight);
// }


// updated code 

// function highlightElement(element) {
//     element.originalStyle = element.getAttribute('style');
//     element.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';  // Blue with 30% opacity
// }

// function unhighlightElement(element) {
//     if (element.originalStyle) {
//         element.style.backgroundColor = element.originalStyle;
//     } else {
//         element.style.backgroundColor = '';
//     }
// }

// // Add mouseenter and mouseleave event listeners to elements
// var elements = document.getElementsByTagName("*");
// for (var i = 0; i < elements.length; i++) {
//     elements[i].addEventListener('mouseenter', function(event) {
//         highlightElement(event.target);
//     });

//     elements[i].addEventListener('mouseleave', function(event) {
//         unhighlightElement(event.target);
//     });
// }

// window.getIndicatedElementXPath = function() {
//     var xpath = getXPath(indicatedElement);
//     return xpath;
// };

// var indicatedElement = null;

// window.addEventListener('click', function(event) {
//     indicatedElement = event.target;
// });

// window.addEventListener('click', function(event) {
//     var xpath = getXPath(event.target);
//     alert(xpath);
// });

// // // Function to get the XPath of an element
// function getXPath(element) {
//     if (!element) {
//         return '';
//     }

//     if (element.tagName.toLowerCase() === 'html') {
//         return '/html[1]';
//     }

//     var parentPath = getXPath(element.parentNode);
//     var elementIndex = Array.prototype.indexOf.call(element.parentNode.childNodes, element) + 1;

//     // If the element has an ID, use it for the XPath
//     if (element.id) {
//         return parentPath + '/' + element.tagName.toLowerCase() + '[@id="' + element.id + '"]';
//     }

//     // If the element has a unique class, use it for the XPath
//     if (element.classList && element.classList.length === 1) {
//         var className = element.classList[0];
//         return parentPath + '/' + element.tagName.toLowerCase() + '[@class="' + className + '"][' + elementIndex + ']';
//     }

//     // If the element has a name attribute, use it for the XPath
//     if (element.hasAttribute('name')) {
//         var name = element.getAttribute('name');
//         return parentPath + '/' + element.tagName.toLowerCase() + '[@name="' + name + '"][' + elementIndex + ']';
//     }

//     // If none of the above, use the element's position in its parent as part of the XPath
//     return parentPath + '/' + element.tagName.toLowerCase() + '[' + elementIndex + ']';
// }


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

// Add mouseenter and mouseleave event listeners to elements
var elements = document.getElementsByTagName("*");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('mouseenter', function(event) {
        highlightElement(event.target);
    });

    elements[i].addEventListener('mouseleave', function(event) {
        unhighlightElement(event.target);
    });
}

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

// Function to unhighlight all elements
function unhighlight_elements() {
    var highlightedElements = document.querySelectorAll('[style*="rgba(0, 0, 255, 0.3)"]');
    for (var i = 0; i < highlightedElements.length; i++) {
        unhighlightElement(highlightedElements[i]);
    }
}

// Listen for a custom event to trigger unhighlighting
window.addEventListener('unhighlight', function() {
    unhighlight_elements();
});
