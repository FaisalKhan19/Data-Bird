import requests
import pandas as pd

def get_data(url):
    responce = requests.get(url)
    # if responce != 200:
    #     raise ValueError("API Call was not successful")
    data = responce.json()

    return pd.DataFrame(data)

get_data('https://api.tickertape.in/stocks/financials/balancesheet/TCS/annual/normal?count=10')