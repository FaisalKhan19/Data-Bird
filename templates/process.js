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
        entryContainer.addEventListener('click', function (event) {
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
        // Create a container for each entry
        const entryContainer = document.createElement("div");
        entryContainer.classList.add("entry-container");

        const tagElement = document.createElement("button");
        tagElement.classList.add("tag-element");
        tagElement.textContent = tagName;

        entryContainer.appendChild(tagElement);

        dynamicContentContainer.appendChild(entryContainer);
    }
    addDropBehavior();
}

function addDraggableBehavior() {
    const draggableTools = document.querySelectorAll(".draggable-tool");

    draggableTools.forEach(draggableTool => {
        draggableTool.draggable = true; // Set the element as draggable

        draggableTool.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', draggableTool.textContent);
        });
    });
}

addDraggableBehavior();

// Function to add drop behavior to entry containers
function addDropBehavior() {
    const dragTargets = document.querySelectorAll(".entry-container");

    dragTargets.forEach(dragTarget => {
        dragTarget.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        dragTarget.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedData = event.dataTransfer.getData('text/plain');

            // Create a new element to display the dropped data
            const droppedElement = document.createElement('div');
            droppedElement.textContent = `Dropped: ${draggedData}`;
            droppedElement.classList.add('drag-element');
            droppedElement.style.backgroundColor = '#27ae60'; // Custom color

            // Append the new element after the drop target
            dragTarget.insertAdjacentElement('afterend', droppedElement);
        });
    });
}
