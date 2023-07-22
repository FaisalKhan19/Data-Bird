from driver import driver
from common import WebDriverWait, By, EC

def table(xpath, return_type):

    table = driver.find_element(By.XPATH,xpath)
    table_rows = table.find_elements(By.TAG_NAME, "tr")

    data_rows = []
    for table_row in table_rows:
        data_rows.append([cell.text for cell in table_row.find_elements(By.TAG_NAME, "td")])