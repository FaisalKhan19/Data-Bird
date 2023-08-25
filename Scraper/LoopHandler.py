def read_from_dataframe(driver, df, col_name, mappings):
    for var in df[col_name]:
        for class_ in mappings.items():
            task = mappings[class_]
            if task == 'Type Into':
                type_into(driver,class_,var)
            elif task == 'Mouse Click':
                driver.find_element(By.CLASS_NAME, class_).click()
            elif task == 'Hover':
                actions = ActionChains(driver)
                hover_element = driver.find_element(By.CLASS_NAME, class_)
                actions.move_to_element(hover_element).perform()
            elif task == 'Scrape Table':
                table = driver.find_element(By.CLASS_NAME, class_)
                table = scrape_tabel(table, 'dataframe')
                return table
            elif task == 'Screenshot':
                element = driver.find_element(By.CLASS_NAME, class_)
                element.screenshot("image_sc.png")
            elif task == 'Scrape Graph':
                scrape_graph(driver, class_)
                
            
