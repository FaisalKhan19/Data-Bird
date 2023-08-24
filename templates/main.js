window.onload = function() {
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
    if(ENDP.length < 0) {
        getDataButton.classList.add('animate__animated','animate__headShake'); 

        setTimeout(function() {
            getDataButton.classList.remove('animate__animated', 'animate__headShake');
        }, 500);
    } 
    const response = await fetch(apiEndpoint);
    const dataDisplay = document.getElementById('dataDisplay');
    const errorMessage = document.getElementById('errorMessage');

    if (response.ok) {
        const data = await response.json();
        dataDisplay.innerHTML = 'Successfully Fetched the API data!';
        dataDisplay.style.color ='green'
        dataDisplay.style.display = 'block';
        errorMessage.style.display = 'none';

        const saveOptions = `
    <div class="text-center mt-3">
        <button type="button" class="btn btn-success btn-lg" id="saveCSVButton">Save as CSV</button>
        <button type="button" class="btn btn-success btn-lg" id="saveJsonButton">Save as JSON</button>
    </div>
`;
        dataDisplay.innerHTML+=saveOptions;

        document.getElementById('saveJsonButton').addEventListener('click', function(){
            saveDataAsJSON(data);
        })

        document.getElementById('saveCSVButton').addEventListener('click',function(){
            saveDataAsCSV(data);
        })
        

    } else {
        
        errorMessage.innerHTML = 'Failed to Fetch the API data!';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'block';
        dataDisplay.style.display = 'none';
        getDataButton.classList.add('animate__animated','animate__headShake'); 

        setTimeout(function() {
            getDataButton.classList.remove('animate__animated','animate__headShake');
        },500)
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
    
    setTimeout(function() {
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
    try{
        const trackedItemsL = await eel.itemsInDB()();
        return trackedItemsL;
    }
    catch(error) {
        console.error("Encountered Error while retreiving data from the server!!!",error);
        throw error;

    }
}
async function loadTrackedItems() {
    try {
        const trackedItems = await getAllTrackedProducts();
        const NOItemsYET = document.getElementById('NOItemsYET');
        if(trackedItems.length>0) {
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


const InternetStatus = document.getElementById("internetStatus");

window.addEventListener('load', detectInternet);
window.addEventListener('online', detectInternet);
window.addEventListener('offline', detectInternet);

function detectInternet() {
    if (navigator.onLine) {
        InternetStatus.innerHTML = ''; 
        window.location.replace('./index.html');
    } else {
        const offlineImage = document.createElement('img');
        offlineImage.src = './NoInternetImage.jpg'; 
        offlineImage.alt = 'No Internet';
        InternetStatus.innerHTML = ''; 
        InternetStatus.appendChild(offlineImage);
        window.location.replace('./NoInternetPage.html');
    }
}



