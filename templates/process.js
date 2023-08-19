document.getElementById("load-json-button").addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", handleFileSelection);
    fileInput.click();
});

function handleFileSelection(event) {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = function (e) {
            const content = e.target.result;
            const jsonData = JSON.parse(content);
            generateVisualization(jsonData);
            manage_class(jsonData);
        };

        reader.readAsText(file);
    } else {
        document.getElementById("output").textContent = "Please select a valid JSON file.";
    }
}

function manage_class(jsonData) {
    const entryContainers = document.getElementsByClassName("tag-element");

    for (const entryContainer of entryContainers) {
        entryContainer.addEventListener('click', function(event) {
            const manageClass = document.getElementById("manage-class");
            // Clear existing content
            while (manageClass.firstChild) {
                manageClass.removeChild(manageClass.firstChild);
            }
            
            // Create a new span element and append jsonData[tag] as its content
            const tagClassManage = document.createElement('span');
            tagClassManage.classList.add('tag-class-manage');
            tagClassManage.textContent = jsonData[event.target.textContent];
            
            // Append the new span element to the manageClass container
            manageClass.appendChild(tagClassManage);
        });
    }
}

// Function to dynamically generate the visualization
function generateVisualization(jsonData) {
    const dynamicContentContainer = document.getElementById("dynamicContentContainer");

    // Clear any existing content
    dynamicContentContainer.innerHTML = "";

    // Iterate through JSON data and create elements
    for (const tagName in jsonData) {
        const className = jsonData[tagName];

        // Create a container for each entry
        const entryContainer = document.createElement("div");
        entryContainer.classList.add("entry-container");

        // Create elements for class and tag name
        const classElement = document.createElement("span");
        classElement.classList.add("class-element");
        classElement.textContent = className;

        const arrowElement = document.createElement("span");
        arrowElement.classList.add("arrow-element");
        arrowElement.textContent = "➜";

        const tagElement = document.createElement("button");
        tagElement.classList.add("tag-element");
        tagElement.textContent = tagName;

        // Append elements to the container
        // manage_class.appendChild(classElement);
        // entryContainer.appendChild(arrowElement);
        entryContainer.appendChild(tagElement);

        // Append the entry container to the dynamic content container
        dynamicContentContainer.appendChild(entryContainer);
    }
}
