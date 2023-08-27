from selenium import webdriver
import sys

# driver = None

def initialize_driver():
    global driver
    # Create the Chrome WebDriver
    options = webdriver.ChromeOptions()
    extension_path = "highlight_extension.crx"
    options = webdriver.ChromeOptions()
    options.add_extension(extension_path)
    driver_path = "./chromedriver.exe"
    driver = webdriver.Chrome(executable_path=driver_path,options = options)
    return driver
    
    


def get_driver():
    return driver

def stop():
    if driver:
        driver.quit()
        driver = None
