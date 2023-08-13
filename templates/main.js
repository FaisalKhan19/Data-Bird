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

        document.getElementById('saveCSVButton').addEventListener('click',function(){
            saveDataAsCSV(data);
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

