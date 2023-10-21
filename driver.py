from selenium import webdriver
import sys

driver = None

def initialize_driver():
    # Create the Chrome WebDriver
    options = webdriver.ChromeOptions()
    extension_path = "Q:\Projects\Data Bird Tool\highlight_extension.crx"
    options = webdriver.ChromeOptions()
    options.add_extension(extension_path)
    driver_path = "Q:\Projects\Data Bird Tool\chromedriver.exe"
    driver = webdriver.Chrome(executable_path=driver_path,options = options)
    return driver