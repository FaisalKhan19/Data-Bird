from Main.common import By, pd, json, yaml
# from Main.driver import driver

def identify_table(driver, return_type):
    tables = driver.find_elements(By.TAG_NAME, "table")
    scraped_tables = []

    for table in tables:
        # Scrape data for each table and append the result to the list
        table_data = scrape_table(table, return_type)
        scraped_tables.append(table_data)

    return scraped_tables

def scrape_table(table, return_type):
    # table = driver.find_element(By.XPATH,xpath)
    table_rows = table.find_elements(By.TAG_NAME, "tr")

    data = []
    for table_row in table_rows:
        row_cells = table_row.find_elements(By.TAG_NAME, "td")
        data.append([cell.text for cell in row_cells])

    
    headers = data[0]  # Extract table headers from the first row

    if return_type == "dataframe":
        # Convert the list of rows to a DataFrame with proper headers
        df = pd.DataFrame(data[1:])
        return df
    elif return_type == "json":
        # Convert the list of rows to a list of dictionaries with proper headers and then to a JSON string
        json_data = json.dumps([dict(zip(headers, row)) for row in data[1:]])
        return json_data
    elif return_type == "list_of_dicts":
        # Convert the list of rows to a list of dictionaries with proper headers
        list_of_dicts = [dict(zip(headers, row)) for row in data[1:]]
        return list_of_dicts
    elif return_type == "csv":
        # Convert the list of rows to a CSV string with proper headers
        csv_data = "\n".join([",".join(map(str, row)) for row in data])
        return csv_data
    elif return_type == "excel":
        # Convert the list of rows to a DataFrame with proper headers and save as Excel
        df = pd.DataFrame(data[1:], columns=headers)
        excel_data = df.to_excel("table_data.xlsx", index=False)
        return "table_data.xlsx"
    elif return_type == "yaml":
        # Convert the list of rows to a list of dictionaries with proper headers and then to a YAML string
        yaml_data = yaml.dump([dict(zip(headers, row)) for row in data[1:]])
        return yaml_data
    else:
        raise ValueError("Invalid return type. Supported types are 'dataframe', 'json', 'list_of_dicts', 'csv', 'excel', and 'yaml'.")
