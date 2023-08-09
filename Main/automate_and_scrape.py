from selenium import webdriver
import tkinter as tk
from tkinter import messagebox

def create_webdriver():
    try:
        chrome_service = webdriver.chrome.service.Service('chromedriver.exe')
        chrome_service.start()

        driver = webdriver.Chrome(service=chrome_service)
        return driver
    except Exception as e:
        messagebox.showerror("Error", f"Failed to create WebDriver: {e}")
        return None
    

def add_highlight(driver):
    with open('C:\\Users\\asus\\Desktop\\Data-Bird\\highlight.js', 'r') as highlight_js_file:
        js_file_script = highlight_js_file.read()

    driver.execute_script(js_file_script)

def perform_web_automation(driver, url):
    if driver is not None:
        try:
            driver.get(url)
            # The event listener will only be added if the "Indicate on Screen" button is pressed.
            # We'll use the global variable "indicate_button_pressed" to track this.
            if indicate_button_pressed:
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

def start_scraping(driver, xpath):
    if xpath:
        try:
            elements = driver.find_elements(by = 'xpath',value =xpath)

            for element in elements:
                # Replace this print statement with your scraping logic
                print("this element was found!")
        except Exception as e:
            messagebox.showerror("Error", f"Scraping error: {e}")
    else:
        messagebox.showwarning("Warning", "Please indicate an element first.")

def Indicate(driver):
    
    driver.execute_script("""
        var highlightedElement = null;
        var highlightedXPath = null;

        function highlightElement(element) {
            element.originalStyle = element.getAttribute('style');
            element.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';  // Blue with 30% opacity
        }

        function unhighlightElement(element) {
            if (element.originalStyle) {
                element.style.backgroundColor = element.originalStyle;
            } else {
                element.style.backgroundColor = '';
            }
        }

        function handleElementClick(event) {
            if (highlightedElement) {
                unhighlightElement(highlightedElement);
            }

            highlightedElement = event.target;
            highlightElement(highlightedElement);

            highlightedXPath = getXPath(highlightedElement);
            alert(highlightedXPath);
        }

        // Add the click event listener to the window
        window.addEventListener('click', handleElementClick);

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



def main(main_menu, URL):
    small_window = tk.Toplevel(main_menu)
    main_menu.withdraw()
    small_window.title("Scrape and Indicate Window")

    driver = create_webdriver()

    def indicate_on_screen():
        Indicate(driver)

    def scrape_elements():
        xpath = driver.execute_script("return highlightedXPath;")
        if xpath:
            start_scraping(driver, xpath)

    global indicate_button_pressed
    indicate_button_pressed = False

    scrape_button = tk.Button(small_window, text='Scrape', command=scrape_elements, font=("Helvetica", 14), fg='grey', bg='#D0F0C0')
    scrape_button.pack()

    indicate_on_screen_button = tk.Button(small_window, text='Indicate on Screen', command=indicate_on_screen, font=("Helvetica", 14), fg='grey', bg='#D0F0C0')
    indicate_on_screen_button.pack()

    perform_web_automation(driver, URL)

    small_window.mainloop()

    # Quit the driver and close the browser after the mainloop finishes
    if driver is not None:
        driver.quit()

# Call the main function with the URL and the main_menu (assuming you have obtained these values)
# main("https://example.com", main_menu)

# Call the main function with the URL and the main_menu (assuming you have obtained these values)
# main("https://example.com", main_menu)
