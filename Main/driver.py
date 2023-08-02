from selenium import webdriver
import tkinter as tk
from tkinter import messagebox
from Scraper.structural import identify_table

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
            driver.get('https://www.screener.in/company/524774/')

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

def perform_operation(driver, choice=None):
    print(identify_table(driver, 'dataframe'))

def main():
    root = tk.Tk()
    root.title("Web Automation Example")

    scrape_button = tk.Button(root , text = 'Scrape',command=start_scraping,font =("Helvetica",14),fg= 'grey' )
    # scrape_buttonvscode-file://vscode-app/c:/Users/asus/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html
    indicate_on_screen  =tk.Button(root,text = 'Indicate on Screen',command = Indicate)
    driver = create_webdriver()

    perform_web_automation(driver)
    
    # Function to handle the button press
    def on_button_press():
        perform_operation(driver)

    # Create a button in the GUI
    button = tk.Button(root, text="Perform Operation", command=on_button_press)
    button.pack()

    root.mainloop()
    
    # Quit the driver and close the browser after the mainloop finishes
    if driver is not None:
        driver.quit()

if __name__ == "__main__":
    main()
