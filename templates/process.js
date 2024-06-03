// document.getElementById("load-json-button-workspace").addEventListener("click", function () {
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.accept = ".json";
//     fileInput.addEventListener("change", handleFileSelection);
//     fileInput.click();
//     load_button = document.getElementById("load-json-button-workspace");
//     h2 = document.getElementById("load-process-text")
//     document.getElementById('workspace-container').removeChild(load_button);
//     document.getElementById('workspace-container').removeChild(h2);
// });

document.getElementById("load-json-button").addEventListener("click", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", handleFileSelection);
    fileInput.click();
    // load_button = document.getElementById("load-json-button-workspace");
    // h2 = document.getElementById("load-process-text")
    // document.getElementById('workspace-container').removeChild(load_button);
    // document.getElementById('workspace-container').removeChild(h2);
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
            document.getElementById("build").addEventListener('click', function () {
                mapProcess(jsonData);
            });
            const run_button = document.getElementById("run");
            run_button.addEventListener('click', function () {
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

const dynamicContentContainer = document.getElementById("dynamicContentContainer");
dynamicContentContainer.appendChild(createStepGUI("Use Browser", 'step-container'));
addDropBehavior();
const stepBody = document.getElementById("stepBody");
// Function to dynamically generate the visualization
function generateVisualization(jsonData) {
    console.log(stepBody);
    // Clear any existing content

    // Iterate through JSON data and create elements
    for (const tagName in jsonData) {
        if (tagName == "URL") {

        }
        else {
            // Create a container for each entry
            var step = createStepGUI(tagName, "nested-step-container");
            console.log(step);
            stepBody.appendChild(step);
        }
    }
    addDropBehavior();
    console.log(stepBody);
}

function createStepGUI(stepName, classname) {

    const stepContainer = document.createElement('div');
    stepContainer.classList.add(classname);

    stepContainer.innerHTML = `
    <header class='step-header'>
      <span>${stepName}</span>
      <img src="bullseye.svg" alt="Indicate" id='indicate-${stepName}'>
    </header>
    <div id="stepBody" class='step-body ${stepName}'>
    </div>
    `;
    return stepContainer;
}
const svgns = "http://www.w3.org/2000/svg";
// Function to connect steps with arrows
function connectStepsWithArrows(step1, step2) {
    const svg = document.getElementById("arrows-svg");
    const line = document.createElementNS(svgns, 'line');

    const step1Rect = step1.getBoundingClientRect();
    const step2Rect = step2.getBoundingClientRect();

    const x1 = step1Rect.left + step1Rect.width / 2;
    const y1 = step1Rect.top + step1Rect.height;
    const x2 = step2Rect.left + step2Rect.width / 2;
    const y2 = step2Rect.top;

    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', 'blue');
    line.setAttribute('stroke-width', '2');

    svg.appendChild(line);
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
    const dragTargets = document.querySelectorAll(".step-body");
    var previous_step = null;

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
            const droppedElement = createStepGUI(draggedData, 'nested-step-container');
            // droppedElement.style.backgroundColor = '#27ae60'; // Custom color

            // Check if the event target is the entry-container
            if (event.target.classList.contains('step-body')) {
                // Insert the new element before the placeholder
                event.target.appendChild(droppedElement);
            }
            
            event.target.classList.remove('drag-over'); // Remove the visual indication class
            if (draggedData == 'Type Into') {
                var typeInto = document.querySelector('.Type')
                add_readFrom(typeInto);
            };
            // if (previous_step) {
            //     connectStepsWithArrows(previous_step, droppedElement);
            // };
            // previous_step = droppedElement;

        });
    });
}

function add_readFrom(container) {
    const dialog = document.createElement('div');
    dialog.innerHTML = `
        <div class="readFrom dialog container" style="padding: 10px; text-align: center;">
            <form class="p-3 text-center" action='/' method="post" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="typeinto_input" class="form-label">DataFrame Path(.xlsx, .csv)</label>
                    <input type="text" class="form-control" id="dataframe_path" name="dataframe_path">
                </div>
                <div class="mb-3">
                    <label class="form-label">Column Name</label>
                    <input type="text" class="form-control" id="column_input" name="column_name">
                </div>
            </form> 
        </div>
    `;
    container.appendChild(dialog);
}

let buildCompleted = false;

async function mapProcess(jsonData) {
    const containers = document.querySelectorAll(".entry-container");
    const dataframeInput = document.getElementById("dataframe_path");
    const columnInput = document.getElementById("column_input");

    const process_mapping = {};
    const names_mapping = {};

    const dataframe = dataframeInput.value;
    const column = columnInput.value;

    containers.forEach(container => {
        const action = container.querySelector('.drag-element');
        const tag_name = container.querySelector('.tag-element');

        process_mapping[jsonData[tag_name.textContent]] = action.textContent;
        names_mapping[jsonData[tag_name.textContent]] = tag_name.textContent;
    });

    if (!buildCompleted) {
        // Call the build process only if it hasn't been completed yet
        await eel.map_process(process_mapping, column, dataframe)();
        buildCompleted = true; // Set the flag to true after build process
    }

    eel.init_driver(jsonData["URL"]);
    runProcess(process_mapping, names_mapping, column, dataframe);
}

function runProcess(process_mapping, names_mapping, column, dataframe) {
    eel.run_process(process_mapping, names_mapping, column, dataframe);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var openDropdown = null;

document.querySelectorAll(".dropbtn").forEach(dropbtn => {
    dropbtn.addEventListener('click', (event) => {
        var dropmenu = event.target.textContent;
        if(dropmenu == null) {
            dropmenu = event.target.getAttribute('drop-menu');
        }
        console.log(dropmenu);
        var dropdown = document.getElementById(`myDropdown-${dropmenu}`);
        if (openDropdown !== dropdown) {
            if (openDropdown) {
                openDropdown.classList.remove("show");
            }
            dropdown.classList.toggle("show");
            openDropdown = dropdown;
        } else {
            dropdown.classList.toggle("show");
            openDropdown = dropdown.classList.contains("show") ? dropdown : null;
        }
    });
});

function ActivateHover() {
    document.querySelectorAll(".dropbtn").forEach(dropbtn => {
        var name = null
        dropbtn.addEventListener('mouseenter', (event) => {
            name = event.target.textContent;
            if (openDropdown) {
                openDropdown.classList.toggle("show");
            }
            var dropmenu = event.target.textContent;
            document.getElementById(`myDropdown-${dropmenu}`).classList.toggle("show");
        });
    });
}


// function myFunction() {
//     var item_class = "dropdown-content-" + event
//     console.log(item_class);
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// Close the dropdown menu if the user clicks outside of it
window.onclick = function closeDropdown(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

document.getElementById("indicate-Use Browser").addEventListener('click', function() {
    eel.init_driver();
})