import eel
import requests
from driver import initialize_driver
from bs4 import BeautifulSoup
# name of folder where the html, css, js, image files are located
eel.init('templates')

# @eel.expose
# def demo(x):
#     return x**2

# @eel.expose
# def openCredits():
#     eel.show("credits.html")

# @eel.expose
# def MainPage():
#     # eel.show("index.html")
#     eel.go_to('index.html');
        
# @eel.expose
# def fetch_data(api_endpoint):
#     try:
#         response = requests.get(api_endpoint)
#         data = response.json()
#         return data
#     except Exception as e:
#         return {'error': 'Failed to fetch data'}

@eel.expose
def init_driver(url = 'https://example.com'):
    print("Function called from javascript, url requesetd = ",url)
    initialize_driver(url)

@eel.expose 
def getInfo(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

    imageURL = soup.find('img',class_ ='_396cs4 _2amPTt _3qGmMb')

    url_Image = imageURL.get('src')
    title = soup.find('span',class_= 'B_NuCI').text
    price = soup.find('div',class_='_30jeq3 _16Jk6d').text

    return url_Image, title, price

eel.start('index.html', size=(1200, 600))

# const trackingItemList = document.getElementById('TrackItems');
#         const monitorButton = document.getElementById('Monitor');

#         monitorButton.addEventListener('click', async function() {
#         const NOItemsYET = document.getElementById("NOItemsYET");
#         const URL_INPUT = document.getElementById('TrackingURL');
#         const Emptyerror = document.getElementById('empty-error');

#         const url = URL_INPUT.value.trim();

#         if (url.length > 0) {
#         NOItemsYET.style.display = 'none';
#         Emptyerror.style.display = 'none';
#         try {
#             // Call the getInfo function exposed using Eel
#             const [imageUrl, title, price] = await eel.getInfo(url)();
            
            # const cardDiv = document.createElement("div");
            # cardDiv.classList.add("col-md-3", "mb-3"); // Adjust the width of the card container
            
            # const card = document.createElement("div");
            # card.classList.add("card");
            
            # const cardImage = document.createElement("img");
            # cardImage.classList.add("card-img-top");
            # cardImage.src = imageUrl;
            # cardImage.alt = 'Tracked Product Image';
            
            # const cardBody = document.createElement("div");
            # cardBody.classList.add("card-body");
            
            # const cardTitle = document.createElement("h5");
            # cardTitle.classList.add("card-title");
            # cardTitle.textContent = title;
            
            # cardBody.appendChild(cardTitle);
            # card.appendChild(cardImage);
            # card.appendChild(cardBody);
            # cardDiv.appendChild(card);
            # trackingItemList.appendChild(cardDiv);
#         } catch (error) {
#             console.error('Error fetching webpage:', error);
#         }
#         } else {
#             Emptyerror.innerHTML = 'No URL entered. Please Enter a Valid URL.';
#             Emptyerror.style.display = 'block';
#             Emptyerror.style.color = 'red';

#             monitorButton.classList.add('animate__animated', 'animate__headShake');

#         setTimeout(function() {
#             monitorButton.classList.remove('animate__animated', 'animate__headShake');
#         }, 500);
#         }
#         });

# const preTrackedItemsList = document.getElementById("preTrackedItemsList");
#         preTrackedItems.forEach(item => {
#             const cardDiv = document.createElement("div");
#             cardDiv.classList.add("col-md-4", "mb-3");

#             const card = document.createElement("div");
#             card.classList.add("card");

#             const cardImage = document.createElement("img");
#             cardImage.classList.add("card-img-top");
#             cardImage.src = item.image;
#             cardImage.alt = item.title;

#             const cardBody = document.createElement("div");
#             cardBody.classList.add("card-body");
            
#             const cardTitle = document.createElement("h5");
#             cardTitle.classList.add("card-title");
#             cardTitle.textContent = item.title;

#             cardBody.appendChild(cardTitle);
#             card.appendChild(cardImage);
#             card.appendChild(cardBody);
#             cardDiv.appendChild(card);

#             cardDiv.addEventListener("click", () => {
#                 // Open chart or perform action on card click
#                 // You can use item.priceData to display the price chart
#             });

#             preTrackedItemsList.appendChild(cardDiv);
#         });
