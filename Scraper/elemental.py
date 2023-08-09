from Main.automate_and_scrape import driver
from Main.common import By, requests, pd


def get_all_images():
    image_elements = driver.find_all(By.TAG_NAME, "img")

    for idx, image_element in enumerate(image_elements):
        image_url = image_element.get_attribute("src")
        if image_url:
            response = requests.get(image_url)
            if response.status_code == 200:
                with open(f"image_{idx}.jpg", "wb") as f:
                    f.write(response.content)
                print(f"Image {idx} downloaded.")
            else:
                print(f"Failed to download Image {idx}.")
        else:
            print(f"Image {idx} does not have a valid URL.")


def get_image(xpath):
    image = driver.find_element(By.XPATH, xpath)
    url = image.get_attribute("src")
    if url:
        responce = requests.get(url)
        if responce.status_code is 200:
            with open("image.jpg", "wb") as f:
                f.write(responce.content)
    else:
        image.screenshot("image_sc.png")


def screenshot(xpath):
    element = driver.find_element(By.XPATH, xpath)
    element.screenshot("image_sc.png")


def scrape(driver, scrape_dict={}):
    if len(scrape_dict) == 0:
        return "No selection provided"

    for i, (type, class_name) in enumerate(scrape_dict.items()):
        if type == "list":
            ul = driver.find_element(By.CLASS_NAME, class_name)
            list_el = ul.find_elements(By.TAG_NAME, "li")
            list_ = []
            for item in list_el:
                list_[i].append(item.text.strip())
            return list_

        elif type == "card":
            print(class_name['card'])
            cards = driver.find_elements(By.CLASS_NAME, class_name['card'])
            data = []
            cards_scrape = class_name
            del cards_scrape['card']
            for card in cards:
                row = []
                for i, (type, class_name) in enumerate(cards_scrape.items()):
                    if type == 'text':
                        text_element = card.find_element(By.CLASS_NAME,class_name)
                        row.append(text_element.text.strip())
                    elif type == 'list':
                        ul = card.find_element(By.CLASS_NAME, class_name)
                        list_el = ul.find_elements(By.TAG_NAME, "li")
                        list_ = []
                        for item in list_el:
                            list_.append(item.text.strip())
                        row.extend(list_)
                data.append(row)
            return pd.DataFrame(data)