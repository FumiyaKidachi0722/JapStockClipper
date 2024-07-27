# ai_analysis/src/data_loader.py

import pandas as pd
import yfinance as yf

def load_stock_data(symbol: str, start: str, end: str):
    """
    Load stock data from Yahoo Finance for the given symbol and date range.

    :param symbol: Stock symbol
    :param start: Start date (YYYY-MM-DD)
    :param end: End date (YYYY-MM-DD)
    :return: DataFrame containing the stock data
    """
    df = yf.download(symbol, start=start, end=end)
    df.reset_index(inplace=True)
    df['Date'] = df['Date'].astype(str)  # Convert Date to string
    return df
