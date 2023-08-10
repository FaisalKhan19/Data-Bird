import eel
# name of folder where the html, css, js, image files are located
eel.init('templates')

@eel.expose
def demo(x):
    return x**2

@eel.expose
def openCredits():
    eel.open("credits.html")


eel.start('index.html', size=(1000, 600))


