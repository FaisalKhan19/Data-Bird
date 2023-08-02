from selenium import webdriver
import sys

# driver = None

def initialize_driver(url):
    global driver
    # Create the Chrome WebDriver
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run Chrome WebDriver in headless mode (without GUI)
    # driver_path = "./Chromedriver_Win32/chromedriver.exe"
    # driver = webdriver.Chrome(executable_path=driver_path, options=options)
    driver_path = "./chromedriver.exe"
    driver = webdriver.Chrome(executable_path=driver_path,options = options)
    driver.get(url)
    sys.stdout.write("Driver Running")
    
    


def get_driver():
    return driver

def stop():
    if driver:
        driver.quit()
        driver = None
