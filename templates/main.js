window.onload = function() {
    const mainContainer = document.querySelector('.container.text-center.main-page');
    mainContainer.style.animation = 'fadeInUp 1.5s forwards';
};

function MainPage() {
    window.location.replace('index.html');
};

async function getData() {
    const apiEndpoint = document.getElementById('apiEndpoint').value;
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
        

    } else {
        errorMessage.innerHTML = 'Failed to Fetch the API data!';
        errorMessage.style.color = 'red';
        errorMessage.style.display = 'block';
        dataDisplay.style.display = 'none';
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
    console.log('Data saved as CSV:',data);
}
function saveDataAsJSON(data) {
    const jsonData = JSON.stringify(data, null, 2); // Extract and beautify the JSON data array
    const filename = 'data.json';
    const contentType = 'application/json';
    saveData(jsonData, filename, contentType);
}

//https://jsonplaceholder.typicode.com/posts
