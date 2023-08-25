import eel
import requests
from driver import initialize_driver
from bs4 import BeautifulSoup
import pandas as pd
import tkinter as tk

import mysql.connector
from Scraper.LoopHandler import read_from_dataframe

eel.init('templates')

# connection to the database hosted on aws rds

def connect_to_db():
    try:
        db_connection = mysql.connector.connect(
            host='price-tracker-db.cqjwbw9v5jpi.us-east-2.rds.amazonaws.com',
            user='DataBird',
            password='databird1472023',
            database='price_tracking_Database'
        )
        return db_connection
    except Exception as e:
        print("Error connecting to database:", e)
        return None

db_connection = connect_to_db()

def is_internet_available():
    try:
        requests.get("http://www.google.com", timeout=5)
        return True
    except requests.ConnectionError:
        return False
    
@eel.expose
def check_and_start():
    if not is_internet_available():
        eel.start('NoInternetPage.html', size=(1200, 600))
    else:
        eel.start('index.html', size=(1200, 600))

@eel.expose
def init_driver(url = 'https://example.com'):
    print("Function called from javascript, url requesetd = ",url)
    driver = initialize_driver(url)
    driver.get(url)

@eel.expose
def map_process(driver, mapping, column, df_path):
    print("process mapping recieved: ", mapping, column, df_path)
    read_from_dataframe(driver, df_path, column, mapping)

@eel.expose 
def getInfo(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

    imageURL = soup.find('img',class_ ='_396cs4 _2amPTt _3qGmMb')

    url_Image = imageURL.get('src')
    title = soup.find('span',class_= 'B_NuCI').text
    price = soup.find('div',class_='_30jeq3 _16Jk6d').text

    return url_Image, title, price

@eel.expose
def insert_product(product):
    try:
        cursor = db_connection.cursor()
        query = 'INSERT INTO price_tracking_Database.tracked_products (product_name, product_url, target_price, image_url) VALUES (%s, %s, %s, %s)'
        values = (product['product_name'], product['product_url'], product['target_price'], product['image_url'])
        cursor.execute(query, values)
        db_connection.commit()
        print("Successulyyy Inserted the data into the database")
        return cursor.lastrowid
    except Exception as e:
        print('Error inserting product:', e)
        db_connection.rollback()
        raise e
    finally:
        cursor.close()

@eel.expose
def itemsInDB():
    try:
        cursor = db_connection.cursor()
        query = 'SELECT * FROM price_tracking_Database.tracked_products'
        cursor.execute(query)
        rows = cursor.fetchall()  # Fetch all the rows
        cursor.close()  # Close the cursor after fetching
        return rows
    except Exception as e:
        print("Something went wrong:", str(e))
if(is_internet_available()) :
    eel.start('index.html', size=(1200, 600))

else: 
    eel.start('NoInternetPage.html',size =(1200,600))


# const databaseProducts = getAllTrackedProducts();
#         if(databaseProducts.length<=0) {
#             trackingItemList.innerHTML = 'No items set to track...!!!';
#         } 
#         else if(databaseProducts.length>0) {
#             databaseProducts.forEach(async item=>{
#                 const loader = document.createElement("div");
#                 loader.classList.add("spinner-border", "text-primary");
#                 loader.style.margin = "auto"; // Center the loader
#                 loader.style.display = "flex"; // Set display to flex
#                 loader.style.alignItems = "center"; // Center vertically
#                 loader.style.justifyContent = "center"; // Center horizontally

#                 const cardDiv = document.createElement("div");
#                 cardDiv.classList.add("col-md-2", "mb-2"); // Adjust the width of the card container
                    
#                 cardDiv.appendChild(loader);

#                 trackingItemList.appendChild(cardDiv);
#                 try {
#                     const card = document.createElement('div');
#                     card.classList.add("card");

#                     const cardImage = document.createElement("img");
#                     cardImage.classList.add("card-img-top");
#                     cardImage.src = item.image_url;
#                     cardImage.alt = 'Tracked Product Image';

#                     const cardBody = document.createElement("div");
#                     cardBody.classList.add("card-body");
                
#                     const cardTitle = document.createElement("h5");
#                     cardTitle.classList.add("card-title");
#                     cardTitle.textContent = item.product_name;

#                     cardBody.appendChild(cardTitle);
#                     card.appendChild(cardImage);
#                     card.appendChild(cardBody);

#                     cardDiv.innerHTML = ""; // Clear the cardDiv
#                     cardDiv.appendChild(card);

#                 }
#                 catch(error) {
#                     trackingItemList.removeChild(cardDiv);
#                     console.error("some error occured!!!");
#                 }
#                 else {
#                     console.log("Spme otjebe rrro ");
#                 }

#             })
#         }





# correct load 
# async function loadTrackedItems() {
#             const trackedItems = await getAllTrackedProducts();

#             trackedItems.forEach(item => {
#                 const cardDiv = document.createElement("div");
#         cardDiv.classList.add("col-md-2", "mb-2"); // Adjust the width of the card container

#         const card = document.createElement("div");
#         card.classList.add("card");

#         const cardImage = document.createElement("img");
#         cardImage.classList.add("card-img-top");
#         cardImage.src = item.image_url;
#         cardImage.alt = 'Tracked Product Image';

#         const cardBody = document.createElement("div");
#         cardBody.classList.add("card-body");

#         const cardTitle = document.createElement("h5");
#         cardTitle.classList.add("card-title");
#         cardTitle.textContent = item.product_name;

#         const cardPrice = document.createElement("h5");
#         cardPrice.classList.add("card-text");
#         cardPrice.textContent = `Target Price: $${item.target_price}`;

#         const cardLink = document.createElement("a");
#         cardLink.classList.add("btn", "btn-primary");
#         cardLink.href = item.product_url;
#         cardLink.target = "_blank"; // Open link in a new tab
#         cardLink.textContent = "View Product";

#         cardBody.appendChild(cardTitle);
#         cardBody.appendChild(cardPrice);
#         cardBody.appendChild(cardLink);
#         card.appendChild(cardImage);
#         card.appendChild(cardBody);
#         cardDiv.appendChild(card);

#         trackingItemList.appendChild(cardDiv);
#             });
#         }

# cron.schedule('0 0 * * *', async () => {
#     const products = await getAllTrackedProducts();
#     for (const product of products) {
#         const currentPrice = await fetchCurrentPrice(product.productUrl);
#         await updateProductCurrentPrice(product.id, currentPrice);
#     }
# });