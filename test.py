# from selenium import webdriver
# import tkinter as tk
# from tkinter import messagebox
# import time 

# def create_webdriver():
#     try:
#         # Create a Service object for chromedriver
#         chrome_service = webdriver.chrome.service.Service('chromedriver.exe')
#         chrome_service.start()

#         # Create the driver with the Service object
#         driver = webdriver.Chrome(service=chrome_service)
#         return driver
#     except Exception as e:
#         messagebox.showerror("Error", f"Failed to create WebDriver: {e}")
#         return None
    

# def perform_web_automation(driver, url):
#     if driver is not None:
#         try:
#             driver.get(url)

#             # Add a JavaScript function to apply the highlighting effect
#             driver.execute_script("""
#                 function highlightElement(element) {
#                     element.originalStyle = element.getAttribute('style');
#                     element.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';  // Blue with 30% opacity
#                 }

#                 function unhighlightElement(element) {
#                     if (element.originalStyle) {
#                         element.style.backgroundColor = element.originalStyle;
#                     } else {
#                         element.style.backgroundColor = '';
#                     }
#                 }

#                 // Add mouseenter and mouseleave event listeners to elements
#                 var elements = document.getElementsByTagName("*");
#                 for (var i = 0; i < elements.length; i++) {
#                     elements[i].addEventListener('mouseenter', function(event) {
#                         highlightElement(event.target);
#                     });

#                     elements[i].addEventListener('mouseleave', function(event) {
#                         unhighlightElement(event.target);
#                     });
#                 }
                
#                 window.addEventListener('click', function(event) {
#                     var xpath = getXPath(event.target);
#                     alert(xpath);
#                 });

#                 // Enhanced Function to get the XPath of an element
#                 // (Same as previous getXPath function)
#                 function getXPath(element) {
#                     if (!element) {
#                         return '';
#                     }

#                     if (element.tagName.toLowerCase() === 'html') {
#                         return '/html[1]';
#                     }

#                     var parentPath = getXPath(element.parentNode);
#                     var elementIndex = Array.prototype.indexOf.call(element.parentNode.childNodes, element) + 1;

#                     // If the element has an ID, use it for the XPath
#                     if (element.id) {
#                         return parentPath + '/' + element.tagName.toLowerCase() + '[@id="' + element.id + '"]';
#                     }

#                     // If the element has a unique class, use it for the XPath
#                     if (element.classList && element.classList.length === 1) {
#                         var className = element.classList[0];
#                         return parentPath + '/' + element.tagName.toLowerCase() + '[@class="' + className + '"][' + elementIndex + ']';
#                     }

#                     // If the element has a name attribute, use it for the XPath
#                     if (element.hasAttribute('name')) {
#                         var name = element.getAttribute('name');
#                         return parentPath + '/' + element.tagName.toLowerCase() + '[@name="' + name + '"][' + elementIndex + ']';
#                     }

#                     // If none of the above, use the element's position in its parent as part of the XPath
#                     return parentPath + '/' + element.tagName.toLowerCase() + '[' + elementIndex + ']';
#                 }
#             """)

#         except Exception as e:
#             messagebox.showerror("Error", f"Web Automation error: {e}")





# def scripty(url,main_menu):

#     def indicate_and_scrape(url):
#         indicate_window = tk.Toplevel(main_menu)
#         indicate_window.title("Select Element to Scrape")
#         indicate_window.geometry("400x100")

#         def indicate_element():
#             # Perform the web automation and indicate the element
#             driver = create_webdriver()
#             perform_web_automation(driver, url)
#             driver.quit()

#         def start_scraping():
#             # Perform the web scraping based on the indicated element's XPath
#             driver = create_webdriver()
#             xpath = get_indicated_element_xpath(driver, url)
#             driver.quit()
#             if xpath:
#                 # Perform the scraping using the indicated XPath
#                 # ... (your scraping logic goes here)
#                 print(xpath)
#         indicate_button = tk.Button(indicate_window, text="Indicate Element", command=indicate_element, font=("Helvetica", 12, "bold"))
#         indicate_button.pack(pady=10)

#         scrape_button = tk.Button(indicate_window, text="Scrape", command=start_scraping, font=("Helvetica", 12, "bold"))
#         scrape_button.pack(pady=10)

#         main_menu.withdraw()  # Hide the main menu window

#         indicate_window.mainloop()

#         # Show the main menu window again after the scraping process is done
#         main_menu.deiconify()
#     # root = tk.Tk()
#     # root.title("Web Automation Example")

#     # scrape_button = tk.Button(root , text = 'Scrape',command=start_scraping,font =("Helvetica",14),fg= 'grey' )
#     # scrape_button.pack()
#     # indicate_on_screen  =tk.Button(root,text = 'Indicate on Screen',command = Indicate,font =("Helvetica",14),fg= 'grey')
#     # indicate_on_screen.pack()
#     driver = create_webdriver()

#     perform_web_automation(driver,url)
    
#     # root.mainloop()

#     # Quit the driver and close the browser after the mainloop finishes
#     if driver is not None:
#         driver.quit()

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

def add_highlight_js(driver):
    # Read JavaScript code from the file
    with open("highlight.js", "r") as js_file:
        js_code = js_file.read()

    # Add the JavaScript code to the page
    driver.execute_script(js_code)

def get_indicated_element_xpath(driver):
    try:
        xpath = driver.execute_script("return getIndicatedElementXPath()")
        return xpath
    except Exception as e:
        messagebox.showerror("Error", f"Error in retrieving indicated element's XPath: {e}")
        return None

class IndicateWindow(tk.Toplevel):
    def __init__(self, parent, driver):
        super().__init__(parent)
        self.parent = parent
        self.driver = driver
        self.title("Select Element to Scrape")
        self.geometry("400x100")

        self.url_entry = tk.Entry(self, font=("Helvetica", 12))
        self.url_entry.pack(pady=5)

        indicate_button = tk.Button(self, text="Indicate Element", command=self.indicate_element, font=("Helvetica", 12, "bold"))
        indicate_button.pack(pady=10)

        scrape_button = tk.Button(self, text="Scrape", command=self.start_scraping, font=("Helvetica", 12, "bold"))
        scrape_button.pack(pady=10)

        self.protocol("WM_DELETE_WINDOW", self.on_window_close)

    def indicate_element(self):
        add_highlight_js(self.driver)
        self.driver.get(self.url_entry.get())

    def start_scraping(self):
        xpath = get_indicated_element_xpath(self.driver)
        if xpath:
            # Perform the scraping using the indicated XPath
            # ... (your scraping logic goes here)
            print(xpath)

    def on_window_close(self):
        self.parent.deiconify()
        self.destroy()

def scripty(url, main_menu):
    driver = create_webdriver()
    add_highlight_js(driver)

    main_menu.withdraw()  # Hide the main menu window

    indicate_and_scrape_window = IndicateWindow(main_menu, driver)
    indicate_and_scrape_window.url_entry.insert(0, url)

    indicate_and_scrape_window.mainloop()

    if driver is not None:
        driver.quit()






