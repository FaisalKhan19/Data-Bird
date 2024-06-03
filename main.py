import eel
import requests
from driver import initialize_driver
from bs4 import BeautifulSoup
import pandas as pd
import tkinter as tk
from Main.common import create_dirs, By
import time
import asyncio
import websockets
import os

import mysql.connector
from Scraper.LoopHandler import read_from_dataframe, import_handler

# connection to the database hosted on aws rds

def connect_to_db():
    try:
        db_connection = mysql.connector.connect(
            host=os.getenv("HOST"),
            user=os.getenv("USER"),
            password=os.getenv("PASSWORD"),
            database=os.getenv("DATABASE")
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

class WebAutomation:
    def __init__(self):
        self.global_driver = None

    def init_driver(self, url='https://databirdservices.com/index.html'):
        print("Function called from JavaScript, URL requested =", url)
        self.global_driver = initialize_driver()
        self.global_driver.get(url)

    def quit_driver(self):
        try:
            self.global_driver.quit()
            return
        except:
            return

    def map_process(self, mapping, column, df_path, working_dir="C://Users//Faisal Ali Khan//Data-Bird"):
        print("++++++++++++++++++++++++++++++++++++++++++++++++++")
        print("Process mapping received on build:", mapping, column, df_path)
        print("++++++++++++++++++++++++++++++++++++++++++++++++++")
        imported_actions = import_handler(mappings=mapping)
        create_dirs(mapping, working_dir)
        return imported_actions

    def run_process(self, mapping, names_mapping, column, df_path, working_dir="C://Users//Faisal Ali Khan//Data-Bird"):
        print("++++++++++++++++++++++++++++++++++++++++++++++++++")
        print("Process mapping received on run:", mapping, column, df_path)
        print("++++++++++++++++++++++++++++++++++++++++++++++++++")
        imported_actions = import_handler(mappings=mapping)
        # self.global_driver.get(global_url)  # Uncomment if global_url is defined somewhere
        read_from_dataframe(self.global_driver, df_path, column, mapping, imported_actions, names_mapping, By, working_dir)

@eel.expose
def init_driver(url = "https://databirdservices.com/index.html"):
    global webAutomation
    webAutomation.init_driver(url)
    time.sleep(5)

@eel.expose
def quit_driver():
    global webAutomation
    webAutomation.quit_driver()

@eel.expose
def map_process(mapping, column, df_path, working_dir="C://Users//Faisal Ali Khan//Data-Bird"):
    global webAutomation
    webAutomation.map_process(mapping, column, df_path, working_dir)

@eel.expose
def run_process(mapping, names_mapping, column, df_path):
    global webAutomation
    webAutomation.run_process(mapping, names_mapping, column, df_path)

async def websocket_server(websocket, path):
    # Handle WebSocket connections and messages here
    async for message in websocket:
        # Process and respond to incoming messages
        await websocket.send("Received: " + message)

# start_server = websockets.serve(websocket_server, "localhost", 8765)

# asyncio.get_event_loop().run_until_complete(start_server)
# asyncio.get_event_loop().run_forever()


@eel.expose 
def getInfo(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'lxml')

    imageURL = soup.find('img',class_ ='_396cs4 _2amPTt _3qGmMb')

    url_Image = imageURL.get('src')
    title = soup.find('span',class_= 'B_NuCI').text

    price = soup.find('div',class_='_30jeq3 _16Jk6d').text
    price = price.replace("₹","")
    price = price.replace(",","")
    price = int(price)
    print("product name",title," price is ",price)
    return url_Image, title, price

@eel.expose
def insert_product(product):
    try:
        db_connection = connect_to_db()
        cursor = db_connection.cursor()
        query = 'INSERT INTO price_tracking_Database.tracked_products (product_name, product_url, target_price, image_url, current_price) VALUES (%s, %s, %s, %s, %s)'
        values = (product['product_name'], product['product_url'], product['target_price'], product['image_url'], product['current_price'])
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
def delete_product(productId):
    try:
        db_connection = connect_to_db()
        cursor = db_connection.cursor()
        Delete_query = '''DELETE FROM tracked_products WHERE id = %s;'''
        cursor.execute(Delete_query,(productId,))
        db_connection.commit()
        return True
    except: 
        return False

@eel.expose
def itemsInDB():
    try:
        db_connection = connect_to_db()
        cursor = db_connection.cursor()
        query = 'SELECT * FROM price_tracking_Database.tracked_products'
        cursor.execute(query)
        rows = cursor.fetchall()  # Fetch all the rowszz
        cursor.close()  # Close the cursor after fetching
        return rows
    except Exception as e:
        print("Something went wrong:", str(e))


if __name__ == "__main__":
    eel.init('templates')
    webAutomation = WebAutomation()
    if(is_internet_available()) :
        eel.start('index.html', size=(1200, 600))

    else: 
        eel.start('NoInternetPage.html',size =(1200,600))



# @eel.expose
# def check_price_all_items(product_url):
#     try:
#         cursor = db_connection.cursor()

#     except:



