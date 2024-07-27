// frontend/src/pages/stock/index.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Heading } from '@/components/atoms/Heading';
import { RealTimePrice } from '@/components/organisms/RealTimePrice';
import { StockChart } from '@/components/organisms/StockChart';
import { StockHistory } from '@/components/organisms/StockHistory';
import { TechnicalAnalysis } from '@/components/organisms/TechnicalAnalysis';
import { Layout } from '@/components/templates/Layout';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type ChartData = {
  date: string;
  close: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  sma_5: number;
  sma_20: number;
  sma_50: number;
  sma_75: number;
  MiddleBand: number;
  UpperBand: number;
  LowerBand: number;
};

type HistoryData = {
  date: string;
  price: number;
  volume: number;
};

type StockData = {
  Date: string;
  Close: number;
  Volume: number;
  Open: number;
  High: number;
  Low: number;
  sma_5?: number;
  sma_20?: number;
  sma_50?: number;
  sma_75?: number;
  MACD?: number;
  MACD_Signal?: number;
  RSI?: number;
  MiddleBand?: number;
  UpperBand?: number;
  LowerBand?: number;
};

const StockPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [historyData, setHistoryData] = useState<HistoryData[]>([]);
  const [rsi, setRsi] = useState<number | null>(null);
  const [macd, setMacd] = useState<number | null>(null);
  const symbol = '4661.T'; // オリエンタルランドのシンボル

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get<StockData[]>(
          `${API_BASE_URL}/api/stock_data/${symbol}`,
        );
        const data = response.data;

        setChartData(
          data.map((item) => ({
            date: new Date(item.Date).toLocaleDateString(),
            close: item.Close,
            volume: item.Volume,
            open: item.Open,
            high: item.High,
            low: item.Low,
            sma_5: item.sma_5 || 0,
            sma_20: item.sma_20 || 0,
            sma_50: item.sma_50 || 0,
            sma_75: item.sma_75 || 0,
            MiddleBand: item.MiddleBand || 0,
            UpperBand: item.UpperBand || 0,
            LowerBand: item.LowerBand || 0,
          })),
        );

        setHistoryData(
          data.map((item) => ({
            date: new Date(item.Date).toLocaleDateString(),
            price: item.Close,
            volume: item.Volume,
          })),
        );

        if (data.length > 0) {
          setRsi(data[0].RSI || null); // Assuming the RSI is the same for all items
          setMacd(data[0].MACD || null); // Assuming the MACD is the same for all items
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <Layout>
      <Heading level={1} label="株価詳細ページ" />
      <StockChart data={chartData} />
      <RealTimePrice symbol={symbol} />
      {rsi !== null && macd !== null && (
        <TechnicalAnalysis rsi={rsi} macd={macd} />
      )}
      <StockHistory history={historyData} />
    </Layout>
  );
};

export default StockPage;
