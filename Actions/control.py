# from Main.automate_and_scrape import driver
from Main.common import Keys, By

def type_into(driver, xpath, text):
    element = driver.find_element(By.XPATH, xpath)
    print("Log from type_into",element)
    element.click()
    element.send_keys(Keys.CONTROL, "a")
    element.send_keys(text)
    element.send_keys(Keys.ENTER)