from Main.common import ActionChains, WebDriverWait, EC, By
from Main.driver import driver

def scrape(xpath):
    element = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH, xpath)))
    ActionChains(driver).move_to_element_with_offset(element, -400, 0).perform()
    Data = []
    for i in range(0, element.size['width']-750):
        ActionChains(driver).move_by_offset(6.3, 0).perform()
        meta_element = driver.find_element(By.ID,"chart-tooltip-meta")
        data = meta_element.get_attribute("innerHTML").strip()
        Data.append(data)
    return Data