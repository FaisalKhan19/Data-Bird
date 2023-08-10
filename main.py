import eel
# name of folder where the html, css, js, image files are located
eel.init('templates')

@eel.expose
def demo(x):
    return x**2

# @eel.expose
# def openCredits():
#     eel.show("credits.html")

# @eel.expose
# def MainPage():
#     # eel.show("index.html")
#     eel.go_to('index.html');
        

eel.start('index.html', size=(1000, 600))


