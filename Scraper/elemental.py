from Main.driver import driver
from Main.common import By, requests

def get_all_images():
    image_elements = driver.find_all(By.NAME, "img")

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
    url = image.get_attribute('src')
    if url:
        responce = requests.get(url)
        if responce.status_code is 200:
            with open("image.jpg","wb") as f:
                f.write(responce.content)
    else:
        image.screenshot("image_sc.png")

def screenshot(xpath):
    element = driver.find_element(By.XPATH, xpath)
    element.screenshot("image_sc.png")