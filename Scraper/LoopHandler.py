def import_handler(mappings={}):
    imported_actions = {}  # Create a dictionary to store imported actions

    for activity, task in mappings.items():
        if task == "Type Into":
            from Actions.control import type_into
            imported_actions[task] = type_into
        elif task in ["Hover", "Scrape Graph"]:
            from selenium.webdriver.common.action_chains import ActionChains

            imported_actions[task] = ActionChains
        elif task == "Scrape Table":
            from Main.common import By, pd, json, yaml
            from Scraper.structural import scrape_table

            imported_actions[task] = scrape_table

    return imported_actions


def read_from_dataframe(
    driver,
    df_path,
    col_name,
    mappings,
    imported_actions,
    work_dir="C://Users//Faisal Ali Khan",
):
    import os
    path = os.path.normpath(df_path)
    import pandas as pd
    print(path)
    df = pd.read_excel(path)
    for var in df[col_name]:

        for class_, task in mappings.items():
            actions = imported_actions
            if task == "Type Into":
                type_into_func = actions[task]
                type_into_func(driver, class_, var)
            elif task == "Mouse Click":
                driver.find_element(By.CLASS_NAME, class_).click()
            elif task == "Hover":
                action_chain = actions[task]
                hover_element = driver.find_element(By.CLASS_NAME, class_)
                action_chain.move_to_element(hover_element).perform()
            elif task == "Scrape Table":
                scrape_table = actions[task]
                table = driver.find_element(By.CLASS_NAME, class_)
                scrape_table(table, "dataframe", work_dir)
            elif task == "Screenshot":
                element = driver.find_element(By.CLASS_NAME, class_)
                element.screenshot("image_sc.png")
            elif task == "Scrape Graph":
                # Implement or call the scrape_graph function
                pass
