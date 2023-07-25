import tkinter as tk
import colorsys
from tkinter import messagebox , simpledialog
from ttkthemes import ThemedStyle
import ctypes 
from driver import initialize_driver
# def show_tutorial():
#     tutorial_pages = [
#     "Page 1: Introduction to the tool.\nYou can explain the first part of the tutorial here.",
#     "Page 2: Next step in the tutorial.\nYou can explain the next part of the tutorial here.",
#     "Page 3: Final step in the tutorial.\nYou can explain the final part of the tutorial here."
#         ]
#     page_index = 0  
#     while True:
#         tutorial_text = tutorial_pages[page_index]
#         result = messagebox.askokcancel("Tutorial", tutorial_text)

#         if not result:
#             break  
#         else:
#             page_index += 1
#             if page_index >= len(tutorial_pages):
#                 break 


# def show_tutorial():
#     page_index = 0  # Start with the first page
#     tutorial_pages = [
#     "Page 1: Introduction to the tool.\nYou can explain the first part of the tutorial here.",
#     "Page 2: Next step in the tutorial.\nYou can explain the next part of the tutorial here.",
#     "Page 3: Final step in the tutorial.\nYou can explain the final part of the tutorial here."
#         ]
#     while True:
#         tutorial_text = tutorial_pages[page_index]
#         result = messagebox.showinfo("Tutorial", tutorial_text)

#         if not result:
#             break  # User clicked "Cancel" or closed the message box
#         else:
#             page_index += 1
#             if page_index >= len(tutorial_pages):
#                 break  # Reached the last page, exit the loop
### Custom tutorial dialog window


class TutorialDialog(simpledialog.Dialog):
    '''

    this is the best one as this give the most flexibility to edit how thing looks...

    '''
    
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

# Function to show the tutorial when the 'Tutorial' button is pressed
def show_tutorial():
    Tutorial_pages = [
                  "Hi There : Hello and Welcome to Data Bird, A Web Scraper."
                  "Capabilities & What we do: With this tool, you can scrape data from any website... be it Tables, Text, Graphs, images ",
                  "State of the Art: You can now scrape SVG graphs by just selecting them and our tool gets the job done for you, it extracts all the underlying data in the graph and presents it you in your desired format... like excel,Json, csv files."
                  ]

    dialog = TutorialDialog(root, "Tutorials & Credits", Tutorial_pages)



# Function to open the main menu window with options
def open_main_menu():
    # Hide the root window
    root.withdraw()

    def Scrape_text():
        
        messagebox.showinfo("Input Website URL!")


    def Scrape_image():
        
        messagebox.showinfo("Input Website URL!")

    def Scrape_tables():
        
        messagebox.showinfo("Input Website URL!")
    def Scrape_Graphs():

        messagebox.showinfo("Input Website URL")
    
    # root.withdraw()

#   Create a New Window
    main_menu = tk.Toplevel(root)
    main_menu.title("Main Menu")
    main_menu.configure(bg="#29AB91")
    main_menu.geometry(f"{root.winfo_width()}x{root.winfo_height()}")
    main_menu.iconbitmap("./Temp_logo_data_bird.ico")
    icon_path = "./Temp_logo_data_bird.ico"
    ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(icon_path)
    main_menu.iconbitmap(icon_path)
    # main_menu.resizable(False,False) 
    # option1_button = tk.Button(main_menu, text="Scrape Text", command=option1_action, bg="#4287f5", fg="#FFFFFF")
    # option1_button.pack(side= tk.LEFT,padx = 10,pady=10,anchor=tk.N)

    # option2_button = tk.Button(main_menu, text="Scrape Images", command=option2_action, bg="#4287f5", fg="#FFFFFF")
    # option2_button.pack(side= tk.LEFT,padx = 10,pady=10,anchor=tk.N)

    # option3_button = tk.Button(main_menu, text="Scrape Tables", command=option3_action, bg="#4287f5", fg="#FFFFFF")
    # option3_button.pack(side= tk.LEFT,padx = 10,pady=10,anchor=tk.N)

    # option4_button = tk.Button(main_menu, text="Scrape Graphs", command=option4_action, bg="#4287f5", fg="#FFFFFF")
    # option4_button.pack(side= tk.LEFT,padx = 10,pady=10,anchor=tk.N)
    

    menu_bar = tk.Menu(main_menu,font = ("Helvetica",14))
    main_menu.config(menu = menu_bar)

# Function to show an about dialog box
    def show_about():
        messagebox.showinfo("About", "Data Bird\nVersion 0.0\nCreated by Mohd Rehan, Faisal Khan")

    def go_back():
        main_menu.destroy()
        root.deiconify()

    def on_back_button_click():
        go_back()


    back_menu = tk.Menu(menu_bar, tearoff=False,font = ("Helvetica",10))
    menu_bar.add_cascade(label="⇐", menu=back_menu)
    back_menu.add_command(label="Home", command=on_back_button_click)


    Options = tk.Menu(menu_bar,tearoff = False,font = ("Helvetica",10))
    menu_bar.add_cascade(label = "Data Scraping",menu = Options)
    Options.add_command(label = "Scrape Text",command = Scrape_text)
    Options.add_separator()
    Options.add_command(label = "Scrape Images",command = Scrape_image)
    Options.add_separator()
    Options.add_command(label ="Scrape Tables" ,command = Scrape_tables)
    Options.add_separator()
    Options.add_command(label ="Scrape Graph" ,command = Scrape_Graphs)
    

    Automations = tk.Menu(menu_bar,tearoff=False,font = ("Helvetica",10))
    menu_bar.add_cascade(label="Automation\RPA")
    Automations.add_command(label = 'Automation Type 1',command = '')
    Automations.add_separator()
    Automations.add_command(label = 'Automation Type 2',command = '')
    Automations.add_separator()
    Automations.add_command(label = 'Automation Type 3',command = '')
    Automations.add_separator()
    Automations.add_command(label = 'Automation Type 4',command = '')
    
    help_menu = tk.Menu(menu_bar,tearoff =False,font =("Helvetica",10))
    menu_bar.add_cascade(label = 'Help',menu = help_menu)
    help_menu.add_command(label = 'About',command =show_about)

    
    # back_button = tk.Button(main_menu, text="Go Back", command=go_back, bg="#4287f5", fg="#FFFFFF")
    # back_button.pack(side= tk.LEFT,padx = 10,pady=10,anchor=tk.N)
        # Create an input box to get user input
    URL_Label= tk.Label(main_menu, text="Enter URL : ")
    URL_Label.pack(pady=2)

    URL_input = tk.StringVar()  # Variable to store the user input
    URL_entry = tk.Entry(main_menu, textvariable=URL_input,font =("Helvetica",14))
    URL_entry.pack(pady =2)

    # Function to handle user input
    def process_input():
        URL = URL_input.get()
        print("User entered:", URL)
        initialize_driver("http://"+URL)

    # Create a button to process the user input
    submit_button = tk.Button(main_menu, text="Submit", command=process_input,font =("Helvetica",14))
    submit_button.pack(pady=2)


    URL_Label.place(relx = 0.5,rely = 0.4,anchor = tk.CENTER)
    URL_entry.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
    submit_button.place(relx=0.5,rely = 0.6,anchor = tk.CENTER)


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
# font_style = ("Helvetica", 14, "bold")
# label = tk.Label(root, text="Welcome", font=font_style)

# # Create a loading window as a Toplevel widget
# loading_window = tk.Toplevel(root)
# loading_window.title("Initiallizing...")
# loading_window.configure(bg="#F0F0F0")  # Set background color for the loading window

# # Create a Canvas widget to display the loading animation
# canvas = tk.Canvas(loading_window, width=100, height=100, bg="#F0F0F0", highlightthickness=0)
# canvas.pack()

# # Draw a simple loading circle animation
# loading_circle = canvas.create_oval(25, 25, 75, 75, outline="#4287f5", width=2)
# loading_degree = 0

# def animate_loading():
#     global loading_degree
#     loading_degree += 10
#     canvas.coords(loading_circle, 25, 25, 75, 75)
#     canvas.create_arc(25, 25, 75, 75, start=loading_degree, extent=120, outline="#4287f5", width=2)
#     root.after(50, animate_loading)

# # Start the loading animation
# animate_loading()



# root.resizable(False,False)
logo_image = tk.PhotoImage(file="./Data Bird Logo.png")
smaller_image = logo_image.subsample(2,2)

logo_label = tk.Label(root, image=smaller_image)
logo_label.pack(pady=20)

label = tk.Label(root,text = "Welcome to Data Bird (Data Scraping & Automation Software)", bg = "#29AB91" ,fg = "black", font = ("Helvetica",14,"bold"))
label.pack(pady=20)

tutorial_button = tk.Button(root, text="Tutorial", command=show_tutorial, bg=button_color, fg="black",font =("Helvetica",12,"bold"))
tutorial_button.pack(pady=10)


# Create the 'Main Menu' button
main_menu_button = tk.Button(root, text="Main Menu", command=open_main_menu, bg=button_color, fg="black", font = ('Helvetica',12,"bold"))
main_menu_button.pack(pady=10)

root.update_idletasks()  # Ensure all widgets are drawn before calculating center position
x_offset = (root.winfo_screenwidth() - root.winfo_reqwidth()) // 2
y_offset = (root.winfo_screenheight() - root.winfo_reqheight()) // 2
root.geometry(f"+{x_offset}+{y_offset}")



root.mainloop()
