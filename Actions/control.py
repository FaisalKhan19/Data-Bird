# from Main.automate_and_scrape import driver
from Main.common import Keys, By

def type_into(driver, text, xpath):
    element = driver.find_element(By.PATH, xpath)
    element.send_keys(Keys.CONTROL, "a")
    element.send_keys(text)