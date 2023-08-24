import pandas as pd
import numpy as np

def read_from_dataframe(df, col_name, tools):
    for var in df[col_name]:
        for tool in tools:
            tool()
