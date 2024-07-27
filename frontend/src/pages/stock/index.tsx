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
  price: number;
};

type HistoryData = {
  date: string;
  price: number;
  volume: number;
};

type TechnicalData = {
  rsi: number;
  macd: number;
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
        const chartResponse = await axios.get<{
          chart: {
            result: {
              indicators: { quote: { close: number[] }[] }[];
              timestamp: number[];
            }[];
          };
        }>(`${API_BASE_URL}/chart/${symbol}`);
        const historyResponse = await axios.get<{
          history: { date: number; close: number; volume: number }[];
        }>(`${API_BASE_URL}/history/${symbol}`);
        const technicalResponse = await axios.get<{
          technicalAnalysis: TechnicalData;
        }>(`${API_BASE_URL}/technical/${symbol}`);

        setChartData(
          chartResponse.data.chart.result[0].indicators[0].quote[0].close.map(
            (price: number, index: number) => ({
              date: new Date(
                chartResponse.data.chart.result[0].timestamp[index] * 1000,
              ).toLocaleDateString(),
              price,
            }),
          ),
        );

        setHistoryData(
          historyResponse.data.history.map((item) => ({
            date: new Date(item.date * 1000).toLocaleDateString(),
            price: item.close,
            volume: item.volume,
          })),
        );

        setRsi(technicalResponse.data.technicalAnalysis.rsi);
        setMacd(technicalResponse.data.technicalAnalysis.macd);
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
