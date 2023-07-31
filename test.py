from selenium import webdriver
import tkinter as tk
from tkinter import messagebox

def create_webdriver():
    try:
        # Create a Service object for chromedriver
        chrome_service = webdriver.chrome.service.Service('chromedriver.exe')
        chrome_service.start()

        # Create the driver with the Service object
        driver = webdriver.Chrome(service=chrome_service)
        return driver
    except Exception as e:
        messagebox.showerror("Error", f"Failed to create WebDriver: {e}")
        return None

def perform_web_automation(driver):
    if driver is not None:
        try:
            # Open a webpage
            driver.get('https://www.tickertape.in/stocks/tata-consultancy-services-TCS')

            # Add a JavaScript click event listener to the window
            driver.execute_script("""
                window.addEventListener('click', function(event) {
                    var xpath = getXPath(event.target);
                    alert(xpath);
                });

                // Function to get the XPath of an element
                function getXPath(element) {
                    if (element && element.id) {
                        return 'id("' + element.id + '")';
                    } else {
                        return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() +
                            '[' + Array.prototype.indexOf.call(element.parentNode.childNodes, element) + 1 + ']';
                    }
                }
            """)
            
        except Exception as e:
            messagebox.showerror("Error", f"Web Automation error: {e}")

def main():
    root = tk.Tk()
    root.title("Web Automation Example")

    driver = create_webdriver()

    perform_web_automation(driver)

    root.mainloop()

    # Quit the driver and close the browser after the mainloop finishes
    if driver is not None:
        driver.quit()

if __name__ == "__main__":
    main()
