function openCredits() {
    eel.openCredits()(setCreditsContent);
    document.querySelector('.container.text-center').style.display = 'none';
}

function setCreditsContent(pages) {
    document.querySelector('.container.text-center').innerHTML = pages;
}

function openMainPage() {
    document.querySelector('.container.text-center').style.display = 'block';
    document.querySelector('.credits-page').style.display = 'none';
}


function closeMainPage() {
    document.querySelector('.container.text-center').style.display = 'none';
}
