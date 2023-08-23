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
            document.getElementById("build").addEventListener('click', function() {
                mapProcess(jsonData);
            });
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
        const placeholder = document.createElement('span');
        entryContainer.classList.add("entry-container");
        placeholder.classList.add('placeholder');

        const tagElement = document.createElement("button");
        tagElement.classList.add("tag-element");
        tagElement.textContent = tagName;

        entryContainer.appendChild(placeholder);
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

function addDropBehavior() {
    const dragTargets = document.querySelectorAll(".entry-container");

    dragTargets.forEach(dragTarget => {
        dragTarget.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        const placeholder = document.getElementsByClassName('placeholder');
        dragTarget.addEventListener('dragenter', (event) => {
            event.target.classList.add('drag-over'); // Add a class for visual indication
        });

        dragTarget.addEventListener('dragleave', (event) => {
            event.target.classList.remove('drag-over'); // Remove the visual indication class
        });

        dragTarget.addEventListener('drop', (event) => {
            event.preventDefault();
            const draggedData = event.dataTransfer.getData('text/plain');

            // Create a new element to display the dropped data
            const droppedElement = document.createElement('div');
            droppedElement.textContent = `${draggedData}`;
            droppedElement.classList.add('drag-element');
            // droppedElement.style.backgroundColor = '#27ae60'; // Custom color

            // Check if the event target is the entry-container
            if (event.target.classList.contains('entry-container')) {
                const placeholderElement = event.target.querySelector('.placeholder');
                // Insert the new element before the placeholder
                event.target.insertBefore(droppedElement, placeholderElement);
            }
            
            event.target.classList.remove('drag-over'); // Remove the visual indication class
            if(draggedData == 'Type Into'){
                add_readFrom(dragTarget);
            };
        });
    });
}

function add_readFrom(container) {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
        <div class="readFrom dialog container style="padding: 10px; text-align: center;">
            <form class="p-3 text-center" action='/' method="post" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="typeinto_input" class="form-label">DataFrame(.xlsx, .csv)</label>
                    <input class="form-control" type="file" id="typeinto_input" name="typeinto_input">
                <div>
                <div class="mb-3">
                    <label class="form-label">Column Name</label>
                    <input type="text" class="form-control" id="column_name" name="column_name">
                </div>
            </form> 
        </div>
    `
    container.appendChild(dialog);
}

function mapProcess(jsonData) {
    const containers = document.querySelectorAll(".entry-container");
    const process_mapping = {};
    containers.forEach(container => {
        const action = container.querySelector('.drag-element');
        const tag_name = container.querySelector('.tag-element');
        process_mapping[jsonData[tag_name.textContent]] = action.textContent;
    });
    eel.map_process(process_mapping); 
}