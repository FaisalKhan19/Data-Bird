from common import requests, pd

def get_data(url):
    responce = requests.get(url)
    if responce != 200:
        raise ValueError("API Call was not successful")
    data = responce.json()

    return pd.DataFrame(data)