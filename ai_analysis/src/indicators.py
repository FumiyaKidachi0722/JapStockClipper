# ai_analysis/src/indicators.py

import pandas as pd

def calculate_sma(df, window):
    """
    Calculate the Simple Moving Average (SMA) for the given window size.

    :param df: DataFrame containing stock data
    :param window: Integer, the window size for the SMA calculation
    :return: DataFrame with an additional column for the SMA
    """
    df[f'sma_{window}'] = df['Close'].rolling(window=window).mean()
    df[f'sma_{window}'] = df[f'sma_{window}'].fillna(0)  # NaNを0に置き換え
    return df

def calculate_macd(df, short_window=12, long_window=26, signal_window=9):
    """
    Calculate the Moving Average Convergence Divergence (MACD) indicator.

    :param df: DataFrame containing stock data
    :param short_window: Integer, the short window size for the MACD calculation
    :param long_window: Integer, the long window size for the MACD calculation
    :param signal_window: Integer, the window size for the signal line
    :return: DataFrame with additional columns for the MACD and signal line
    """
    short_ema = df['Close'].ewm(span=short_window, adjust=False).mean()
    long_ema = df['Close'].ewm(span=long_window, adjust=False).mean()
    df['MACD'] = short_ema - long_ema
    df['MACD_Signal'] = df['MACD'].ewm(span=signal_window, adjust=False).mean()
    df['MACD'] = df['MACD'].fillna(0)  # NaNを0に置き換え
    df['MACD_Signal'] = df['MACD_Signal'].fillna(0)  # NaNを0に置き換え
    return df

def calculate_rsi(df, window=14):
    """
    Calculate the Relative Strength Index (RSI) for the given window size.

    :param df: DataFrame containing stock data
    :param window: Integer, the window size for the RSI calculation
    :return: DataFrame with an additional column for the RSI
    """
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))
    df['RSI'] = df['RSI'].fillna(0)  # NaNを0に置き換え
    return df

def calculate_bollinger_bands(df, window=20, num_of_std=2):
    """
    Calculate Bollinger Bands for the given window size and number of standard deviations.

    :param df: DataFrame containing stock data
    :param window: Integer, the window size for the moving average
    :param num_of_std: Integer, the number of standard deviations for the bands
    :return: DataFrame with additional columns for the middle, upper, and lower bands
    """
    df['MiddleBand'] = df['Close'].rolling(window=window).mean()
    df['UpperBand'] = df['MiddleBand'] + (df['Close'].rolling(window=window).std() * num_of_std)
    df['LowerBand'] = df['MiddleBand'] - (df['Close'].rolling(window=window).std() * num_of_std)
    df['MiddleBand'] = df['MiddleBand'].fillna(0)  # NaNを0に置き換え
    df['UpperBand'] = df['UpperBand'].fillna(0)  # NaNを0に置き換え
    df['LowerBand'] = df['LowerBand'].fillna(0)  # NaNを0に置き換え
    return df
