from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import datetime as dt
from selenium.webdriver.common.action_chains import ActionChains
import pandas as pd
import time
from bs4 import BeautifulSoup
import os
import numpy as np
import lxml
import requests
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import json
import yaml
import os

def create_dirs(process_mappings,working_dir = "C://Users//Faisal Ali Khan//Data-Bird"):
    try:
        os.chdir(working_dir)
    except:
        os.mkdir(working_dir)
        os.chdir(working_dir)
    for _, task in process_mappings:
        os.mkdir(task)