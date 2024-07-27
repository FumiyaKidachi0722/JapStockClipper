import unittest
import pandas as pd
from src.indicators import calculate_sma, calculate_macd, calculate_rsi, calculate_bollinger_bands

class TestIndicators(unittest.TestCase):

    def setUp(self):
        # テスト用のデータフレームを作成
        data = {
            'Date': pd.date_range(start='2023-01-01', periods=100, freq='D'),
            'Close': pd.Series(range(100)) + pd.Series([5] * 100),
            'Volume': pd.Series(range(100)) + pd.Series([1000] * 100),
            'Open': pd.Series(range(100)) + pd.Series([5] * 100),
            'High': pd.Series(range(100)) + pd.Series([10] * 100),
            'Low': pd.Series(range(100)) + pd.Series([0] * 100),
        }

        self.df = pd.DataFrame(data)
        self.df.set_index('Date', inplace=True)

    def test_calculate_sma(self):
        df_sma = calculate_sma(self.df.copy(), window=5)
        self.assertIn('sma_5', df_sma.columns)
        print(df_sma[['Close', 'sma_5']].tail())

    def test_calculate_macd(self):
        df_macd = calculate_macd(self.df.copy())
        self.assertIn('MACD', df_macd.columns)
        self.assertIn('MACD_Signal', df_macd.columns)
        print(df_macd[['Close', 'MACD', 'MACD_Signal']].tail())

    def test_calculate_rsi(self):
        df_rsi = calculate_rsi(self.df.copy())
        self.assertIn('RSI', df_rsi.columns)
        print(df_rsi[['Close', 'RSI']].tail())

    def test_calculate_bollinger_bands(self):
        df_bb = calculate_bollinger_bands(self.df.copy())
        self.assertIn('MiddleBand', df_bb.columns)
        self.assertIn('UpperBand', df_bb.columns)
        self.assertIn('LowerBand', df_bb.columns)
        print(df_bb[['Close', 'MiddleBand', 'UpperBand', 'LowerBand']].tail())

if __name__ == '__main__':
    unittest.main()
