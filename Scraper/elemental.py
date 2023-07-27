from driver import driver
from common import By, EC, WebDriverWait

def get_all_images():
    images = driver.find_all(By.NAME, "img")
    