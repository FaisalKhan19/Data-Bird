# Data-Bird

![Data Bird Logo](./Data%20Bird%20Logo.png)

A web-based data scraping and automation tool powered by Eel.

## Project Description

Data-Bird is a versatile web scraping and automation application designed to streamline data extraction, price tracking, and API data extraction tasks. This application is built using HTML, CSS, and JavaScript and is run on Windows using the Eel Python package. It exposes Python functionalities to JavaScript, allowing for seamless interaction between the web interface and backend processes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Data Scraping](#data-scraping)
  - [Price Tracking](#price-tracking)
  - [API Data Extraction](#api-data-extraction)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Screenshots](#screenshots)

## Introduction

Data-Bird empowers users with a powerful and user-friendly solution for automating data extraction, price tracking, and API data retrieval tasks. Leveraging the Eel package, it seamlessly integrates Python functionalities with a dynamic web interface.

## Features

### Data Scraping

Data-Bird's data scraping feature enables you to extract information from websites easily. Here's how it works:

1. Enter the URL of the target website.
2. Choose between scraping tables, images, or text content.
3. Utilize the "Similar Elements" feature to scrape multiple similar elements (e.g., product cards on e-commerce sites).
4. Create custom scraping pipelines to sequentially search and extract data.
5. Store scraped data into databases for future reference.

### Price Tracking

Track product prices across various e-commerce websites with ease:

1. Add products and their desired price thresholds.
2. Data-Bird monitors prices across multiple platforms.
3. Receive notifications when prices approach your budget thresholds.

### API Data Extraction

Extract data from APIs efficiently:

1. Utilize Data-Bird's capabilities to fetch data from various APIs.
2. Customize your data extraction process based on API endpoints.

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies using the following command:

```bash
# Replace 'pip' with 'pip3' if necessary
pip install -r requirements.txt
```
## Usage

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `pip install -r requirements.txt`.
3. Run `main.py` to launch the web-based interface (The [Data Bird GUI.py] has been deprecated as we are no more using tkinker for the GUI).
4. Explore the three core features: Data Scraping, Price Tracking, and API Data Extraction.

## Dependencies

Before using Data-Bird, ensure you have the following dependencies installed:

- Python (version X.X)
- Eel (version X.X)
- Other dependencies listed in [requirements.txt](requirements.txt)

## Contributing

If you're interested in contributing to Data-Bird, please follow these guidelines:
- All the scraping logic is written in python.
- The UI indication and element selection is controlled by javascript.
- The app itself is inside the templates folder.
- The UI indication is done through a [chrome extenion](highlight_extension) file.

## License

This project is licensed under the MIT License. For more details, refer to the [LICENSE](LICENSE) file.

## Contact

For inquiries or suggestions, you can reach out via email: faisalk3996@gmail.com and reyan786@gmail.com .

## Screenshots

![Screenshot 1](Screenshots/screenshot(1).png)
![Screenshot 2](Screenshots/screenshot(2).png)
![Screenshot 3](Screenshots/screenshot(3).png)
![Screenshot 4](Screenshots/screenshot(4).png)
![Screenshot 5](Screenshots/screenshot(5).png)

