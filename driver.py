from selenium import webdriver
import sys

# driver = None

def initialize_driver(url):
    global driver
    driver_path = "./Chromedriver_Win32/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=driver_path)
    driver.get(url)
    sys.stdout.write("Driver Running\n")

def get_driver():
    return driver

def stop():
    if driver:
        driver.quit()
        driver = None
