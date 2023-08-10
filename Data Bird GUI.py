import tkinter as tk
import tkinter.ttk as ttk
from tkinter import messagebox , simpledialog
from ttkthemes import ThemedStyle
import ctypes
from test import *
from Main import automate_and_scrape
# import customtkinter as tk

class TutorialDialog(simpledialog.Dialog):

    def __init__(self, parent, title, pages):
        self.pages = pages
        self.page_index = 0
        super().__init__(parent, title=title)
    
    def body(self, frame):
        self.result_text = tk.StringVar()
        self.result_text.set(self.pages[self.page_index])
        self.label = tk.Label(frame, textvariable=self.result_text, wraplength=500)
        self.label.pack(padx=10, pady=5)
        return self.label

    def buttonbox(self):
        box = tk.Frame(self)
        if self.page_index < len(self.pages) - 1:
            next_button = tk.Button(box, text="Next", command=self.next_page)
            next_button.pack(side=tk.LEFT, padx=5, pady=5)
        finish_button = tk.Button(box, text="Finish", command=self.finish)
        finish_button.pack(side=tk.LEFT, padx=5, pady=5)
        box.pack()

    def next_page(self):
        self.page_index += 1
        self.result_text.set(self.pages[self.page_index])

    def finish(self):
        self.destroy()


def show_tutorial():
    Tutorial_pages = [
                  "Hi There : Hello and Welcome to Data Bird, A Web Scraper."
                  "Capabilities & What we do: With this tool, you can scrape data from any website... be it Tables, Text, Graphs, images ",
                  "State of the Art: You can now scrape SVG graphs by just selecting them and our tool gets the job done for you, it extracts all the underlying data in the graph and presents it you in your desired format... like excel,Json, csv files."
                  ]

    dialog = TutorialDialog(root, "Tutorials & Credits", Tutorial_pages)




def data_scraping_menu():

    def update_button_positions(event):
        button_spacing = 0.2  # Adjust this value to control the spacing between buttons
        button_x_offset = 0.2  # Adjust this value to control the starting x position of the buttons

        button_positions = [
            (scrape_text_button, button_x_offset),
            (scrape_image_button, button_x_offset + button_spacing),
            (scrape_tables_button, button_x_offset + 2 * button_spacing),
            (scrape_graph_button, button_x_offset + 3 * button_spacing)
        ]

        for button, x_offset in button_positions:
            button.place_configure(relx=x_offset, rely=0.5, anchor=tk.CENTER)
    
    root.withdraw()

    def Scrape_text():

        messagebox.showinfo("Input Website URL!")


    def Scrape_image():
        
        messagebox.showinfo("Input Website URL!")

    def Scrape_tables():
        process_input()
        messagebox.showinfo("Input Website URL!")

    def Scrape_Graphs():

        messagebox.showinfo("Input Website URL")
    
    


    main_menu = tk.Toplevel(root)
    main_menu.title("Main Menu")
    main_menu.configure(bg="#FFFFFF")
    main_menu.geometry(f"{root.winfo_width()}x{root.winfo_height()}")
    main_menu.iconbitmap("./Temp_logo_data_bird.ico")
    icon_path = "./Temp_logo_data_bird.ico"
    ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(icon_path)
    main_menu.iconbitmap(icon_path)
    
    menu_bar = tk.Menu(main_menu,font = ("Helvetica",14))
    main_menu.config(menu = menu_bar)

# Function to show an about dialog box
    def show_about():
        messagebox.showinfo("About", "Data Bird\nVersion 0.0\nCreated by Mohd Rehan, Faisal Khan")

    def go_back():
        main_menu.destroy()
        root.deiconify()

    # def on_back_button_click():
    #     go_back()

    def on_entry_click(event):
        URL_entry.delete(0, "end") 
        URL_entry.config(fg='black')  
    

    
    help_menu = tk.Menu(menu_bar,tearoff =False,font =("Helvetica",10))
    menu_bar.add_cascade(label = 'Help',menu = help_menu)
    help_menu.add_command(label = 'About',command =show_about)

    
    back_button = tk.Button(main_menu, text="Go Back", command=go_back, bg=button_color, fg="black")
    back_button.pack(side= tk.LEFT,padx = 10,pady=10,anchor=tk.N)
        # Create an input box to get user input
    # URL_Label= tk.Label(main_menu, text="Enter URL : ")
    # URL_Label.pack(pady=2)
    BIG_FONT = ("calibiri",40,"italic")
    MAIN_PAGE_DESIGN = tk.Label(main_menu, text = 'Data Bird',font=BIG_FONT)
    MAIN_PAGE_DESIGN.pack(pady=10)


    URL_input = tk.StringVar()  # Variable to store the user input
    URL_entry = tk.Entry(main_menu, textvariable=URL_input,font =("Helvetica",14),fg= 'grey')
    URL_entry.insert(0,"Enter URL here...")
    URL_entry.bind('<FocusIn>',on_entry_click)
    URL_entry.pack(pady =2)



    scrape_text_button = tk.Button(main_menu, text="Scrape Text", command=Scrape_text, bg=button_color, fg="black")
    scrape_text_button.pack(padx=1)

    scrape_image_button = tk.Button(main_menu, text="Scrape Images", command=Scrape_image, bg=button_color, fg="black")
    scrape_image_button.pack(padx=1)

    scrape_tables_button = tk.Button(main_menu, text="Scrape Tables", command=Scrape_tables, bg=button_color, fg="black")
    scrape_tables_button.pack(padx=1)

    scrape_graph_button = tk.Button(main_menu, text="Scrape Graphs", command=Scrape_Graphs, bg=button_color, fg="black")
    scrape_graph_button.pack(padx=1)

    MAIN_PAGE_DESIGN.place(relx = 0.5,rely = 0.3,anchor =tk.CENTER)
    URL_entry.place(relx= 0.5,rely = 0.4,anchor = tk.CENTER)
    scrape_text_button.place(relx = 0.4,rely = 0.5,anchor = tk.CENTER)
    scrape_image_button.place(relx = 0.5,rely = 0.5,anchor = tk.CENTER)
    scrape_tables_button.place(relx = 0.6,rely = 0.5,anchor = tk.CENTER)
    scrape_graph_button.place(relx =0.7,rely=0.5,anchor=tk.CENTER)

    main_menu.bind("<Configure>", update_button_positions)

    # Function to handle user input
    def process_input():
        URL = URL_input.get()
        URL = "https://" + URL
        print("User entered:", URL)
        automate_and_scrape.main(main_menu,URL)
        
        # main_menu.geometry("800x450")
        # webview.create_window('Requested Website', URL)
        # webview.start()

    

    # submit_button = tk.Button(main_menu, text="Submit", command=process_input,font =("Helvetica",14),fg = 'black',bg = button_color)
    # submit_button.pack(pady=2)

    
    # submit_button.place(relx=0.5,rely = 0.6,anchor = tk.CENTER)
    


button_color = '#D0F0C0'
root = tk.Tk()
root.title("Data Bird")
style = ThemedStyle(root)
style.set_theme('radiance')
root.configure(background="#29AB91")
root.iconbitmap("./Temp_logo_data_bird.ico")
icon_path = "./Temp_logo_data_bird.ico"
ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(icon_path)
root.iconbitmap(icon_path)


# root.resizable(False,False)
logo_image = tk.PhotoImage(file="./Data Bird Logo.png")
smaller_image = logo_image.subsample(2,2)

logo_label = tk.Label(root, image=smaller_image)
logo_label.pack(pady=20)

label = tk.Label(root,text = "Welcome to Data Bird (Data Scraping & Automation Software)", bg = "#29AB91" ,fg = "black", font = ("Helvetica",14,"bold"))
label.pack(pady=20)

tutorial_button = tk.Button(root, text="Tutorial", command=show_tutorial, bg=button_color, fg="black",font =("Helvetica",12,"bold"))
tutorial_button.pack(pady=10)


_to_data_scraping = tk.Button(root, text="Data Scraping", command=data_scraping_menu, bg=button_color, fg="black", font = ('Helvetica',12,"bold"))
_to_data_scraping.pack(pady=10)

_price_tracking_page = tk.Button(root, text="Price Tracking", command='', bg=button_color, fg="black", font = ('Helvetica',12,"bold"))
_price_tracking_page.pack(pady=10)



root.update_idletasks()  
x_offset = (root.winfo_screenwidth() - root.winfo_reqwidth()) // 2
y_offset = (root.winfo_screenheight() - root.winfo_reqheight()) // 2
root.geometry(f"+{x_offset}+{y_offset}")



root.mainloop()
