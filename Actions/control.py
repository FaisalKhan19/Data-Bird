# from Main.automate_and_scrape import driver
from Main.common import Keys, By

def type_into(driver, class_, text):
    element = driver.find_element(By.CLASS_NAME, class_)
    element.send_keys(Keys.CONTROL, "a")
    element.send_keys(text)