window.onload = function () {
    const mainContainer = document.querySelector('.container.text-center.main-page');
    mainContainer.style.animation = 'fadeInUp 1.5s forwards';
};

function MainPage() {
    window.location.replace('index.html');
};

async function getData() {
    const apiEndpoint = document.getElementById('apiEndpoint').value;
    const getDataButton = document.getElementById("getButton");
    const ENDP = apiEndpoint.trim();
    if (ENDP.length < 0) {
        getDataButton.classList.add('animate__animated', 'animate__headShake');

        setTimeout(function () {
            getDataButton.classList.remove('animate__animated', 'animate__headShake');
        }, 500);
    }
    const response = await fetch(apiEndpoint);
    const dataDisplay = document.getElementById('dataDisplay');
    const errorMessage = document.getElementById('errorMessage');

    if (response.ok) {
        const data = await response.json();
        dataDisplay.innerHTML = 'Successfully Fetched the API data!';
        dataDisplay.style.color = 'green'
        dataDisplay.style.display = 'block';
        errorMessage.style.display = 'none';

        const saveOptions = `
    <div class="text-center mt-3">
        <button type="button" class="btn btn-success btn-lg" id="saveCSVButton">Save as CSV</button>
        <button type="button" class="btn btn-success btn-lg" id="saveJsonButton">Save as JSON</button>
    </div>
`;
        dataDisplay.innerHTML += saveOptions;

        document.getElementById('saveJsonButton').addEventListener('click', function () {
            saveDataAsJSON(data);
        })

        document.getElementById('saveCSVButton').addEventListener('click', function () {
            saveDataAsCSV(data);
        })


    } else {

        errorMessage.innerHTML = 'Failed to Fetch the API data!';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'block';
        dataDisplay.style.display = 'none';
        getDataButton.classList.add('animate__animated', 'animate__headShake');

        setTimeout(function () {
            getDataButton.classList.remove('animate__animated', 'animate__headShake');
        }, 500)
    }

}

function saveData(data, filename, contentType) {
    const uint8Array = new TextEncoder().encode(data);
    const blob = new Blob([uint8Array], { type: contentType });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.textContent = 'Download';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(a.href);
}

function saveDataAsCSV(data) {
    const filename = 'data.csv';
    const contentType = 'text/csv';

    const header = Object.keys(data[0]).toString();
    const keys = Object.keys(data[0]);

    // Create CSV content
    const csvData = `${keys.join(',')}\n${data.map(obj => keys.map(key => obj[key]).join(',')).join('\n')}`;

    saveData(csvData, filename, contentType);
}

function saveDataAsJSON(data) {
    const jsonData = JSON.stringify(data, null, 2); // Extract and beautify the JSON data array
    const filename = 'data.json';
    const contentType = 'application/json';
    saveData(jsonData, filename, contentType);
}

function resetForm() {
    const resetButton = document.getElementById('resetButton');
    resetButton.classList.add('animate__animated', 'animate__headShake');

    setTimeout(function () {
        document.getElementById('apiEndpoint').value = ''; // Clear the input field
        document.getElementById('errorMessage').style.display = 'none'; // Hide error message
        document.getElementById('dataDisplay').style.display = 'none'; // Hide data display

        resetButton.classList.remove('animate__animated', 'animate__headShake');
    }, 500);
}

//https://jsonplaceholder.typicode.com/posts


async function insertProduct(product) {
    try {
        const insertedProductId = await eel.insert_product(product)();
        console.log('Product inserted with ID:', insertedProductId);
        return insertedProductId;
    } catch (error) {
        console.error('Error inserting product:', error);
        throw error;
    }
}

async function updateProductCurrentPrice(productId, currentPrice) {
    const connection = await pool.getConnection();
    try {
        const query = 'UPDATE PRICE_TRACKING SET current_price = ? WHERE id = ?';
        await connection.query(query, [currentPrice, productId]);
    } catch (error) {
        console.error('Error updating current price:', error);
        throw error;
    } finally {
        connection.release();
    }
}

async function getAllTrackedProducts() {
    try {
        const trackedItemsL = await eel.itemsInDB()();
        return trackedItemsL;
    }
    catch (error) {
        console.error("Encountered Error while retreiving data from the server!!!", error);
        throw error;

    }
}
async function loadTrackedItems() {
    try {
        const trackedItems = await getAllTrackedProducts();
        const NOItemsYET = document.getElementById('NOItemsYET');
        if (trackedItems.length > 0) {
            NOItemsYET.style.display = 'none';
        }
        trackingItemList.innerHTML = ""; // Clear existing content

        trackedItems.forEach(item => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("col-md-2", "mb-2");

            const card = document.createElement("div");
            card.classList.add("card");

            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img-top");
            cardImage.src = item[4];
            cardImage.alt = item[1];

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = item[1];

            const cardPrice = document.createElement("h5");
            cardPrice.classList.add("card-text");
            cardPrice.textContent = `Target Price: INR ${parseInt(item[3])}`;

            const cardLink = document.createElement("a");
            cardLink.classList.add("btn", "btn-primary");
            cardLink.href = item[2];
            cardLink.target = "_blank";
            cardLink.textContent = "View Product";

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(cardLink);
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            cardDiv.appendChild(card);

            trackingItemList.appendChild(cardDiv);
        });
    } catch (error) {
        console.error('Error loading tracked items:', error);
    }
}


async function fetchCurrentPrice(productUrl) {
    const [imageUrl, title, price] = await eel.getInfo(productUrl)();
    return price;
}
const birdie_logo = document.getElementById('Bird-Logo');

function animateBirdFly() {
    birdie_logo.style.animation = 'fly 5s ease-in-out'; // Apply the flying animation
    setTimeout(() => {
        birdie_logo.style.animation = ''; // Reset the animation
        birdie_logo.style.opacity = 1; // Reset opacity
    }, 5000); // Reset after 5 seconds (animation duration)

    // Optionally, add fading animation here
    birdie_logo.style.opacity = 0; // Start fading out
    birdie_logo.style.transition = 'opacity 1s ease'; // Apply fading animation
}

birdie_logo.addEventListener('click', animateBirdFly);


function injectScraperOverlay() {
    overlayContainer = document.createElement('div');
    overlayContainer.id = 'scraping-overlay';
    overlayContainer.className = 'overlay69 container69';

    overlayContainer.style.position = 'fixed';
    overlayContainer.style.top = '50%';
    overlayContainer.style.left = '50%';
    overlayContainer.style.transform = 'translate(-50%, -50%)';
    overlayContainer.style.width = '500px';
    overlayContainer.style.backgroundColor = 'white';
    overlayContainer.style.zIndex = '9999';
    overlayContainer.style.borderRadius = '8px';
    overlayContainer.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    overlayContainer.style.padding = '20px';

    overlayContainer.innerHTML = `
        <div id="overlay-content" class="overlay69 container69">
            <button id="overlayclose" class="closeoverlay btn btn-gen btn-lg index-button overlay-close" onclick="closeOverlay()">&times;</button>
            <div class="main-page-button">
                <button class="btn btn-gen btn-lg index-button" onclick="injectInputURLOverlay()">Create Process</button>
                <button class="btn btn-gen btn-lg index-button" onclick="openProcess()">Load Process</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlayContainer);
}

function injectInputURLOverlay() {
    overlayContainer_sub = document.createElement('div');
    overlayContainer_sub.id = 'scraping-overlay';
    overlayContainer_sub.className = 'overlay69 container69';

    overlayContainer_sub.style.position = 'fixed';
    overlayContainer_sub.style.top = '50%';
    overlayContainer_sub.style.left = '50%';
    overlayContainer_sub.style.transform = 'translate(-50%, -50%)';
    overlayContainer_sub.style.width = '500px';
    overlayContainer_sub.style.backgroundColor = 'white';
    overlayContainer_sub.style.zIndex = '9999';
    overlayContainer_sub.style.borderRadius = '8px';
    overlayContainer_sub.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    overlayContainer_sub.style.padding = '20px';

    overlayContainer_sub.innerHTML = `
        <div id="overlay-content" class="overlay69 container69">
            <button id="overlayclose" class="closeoverlay btn btn-gen btn-lg index-button overlay-close" onclick="closeOverlay_sub()">&times;</button>
            <div class="main-page-button">
                <p>Enter URL</P>
                <input type="url" class="form-control rounded-input" id="urlInput" placeholder="https://www.example.com">
                <button class="btn btn-primary go-button" onclick="get_driver()" style = "margin-left: 10px;">Go</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlayContainer_sub);
}

function closeOverlay() {
    overlayContainer.remove();
}

function closeOverlay_sub() {
    overlayContainer_sub.remove();
}