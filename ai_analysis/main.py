# ai_analysis/main.py

from fastapi import FastAPI
from src.data_loader import load_stock_data
from src.indicators import calculate_sma, calculate_macd, calculate_rsi, calculate_bollinger_bands
from typing import List
from pydantic import BaseModel

class StockData(BaseModel):
    Date: str
    Close: float
    Volume: int
    Open: float
    High: float
    Low: float
    sma_5: float = None
    sma_20: float = None
    sma_50: float = None
    sma_75: float = None
    MACD: float = None
    MACD_Signal: float = None
    RSI: float = None
    MiddleBand: float = None
    UpperBand: float = None
    LowerBand: float = None

app = FastAPI()

@app.get("/api/stock_data/{symbol}", response_model=List[StockData])
def get_stock_data(symbol: str):
    start = "2019-06-01"
    end = "2024-06-01"
    df = load_stock_data(symbol, start, end)
    
    # テクニカル指標の計算
    df = calculate_sma(df, window=5)
    df = calculate_sma(df, window=20)
    df = calculate_sma(df, window=50)
    df = calculate_sma(df, window=75)
    df = calculate_macd(df)
    df = calculate_rsi(df)
    df = calculate_bollinger_bands(df)

    # データを辞書形式で返す
    data = df.to_dict(orient='records')
    return data

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
