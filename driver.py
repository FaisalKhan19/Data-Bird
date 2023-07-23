from selenium import webdriver

driver = None

def initialize_driver(url):
    global driver
    driver_path = "./Chromedriver_Win32/chromedriver.exe"
    driver = webdriver.Chrome(executable_path=driver_path)
    driver.get
    driver.get(url)

def get_driver():
    return driver

def stop():
    global driver
    if driver:
        driver.quit()
        driver = None
