// frontend/src/components/organisms/RealTimePrice/index.tsx

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import styles from './RealTimePrice.module.css';

type RealTimePriceProps = {
  symbol: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const RealTimePrice: React.FC<RealTimePriceProps> = ({ symbol }) => {
  const [price, setPrice] = useState<number | null>(null);
  const [volume, setVolume] = useState<number | null>(null);
  const [change, setChange] = useState<number | null>(null);

  useEffect(() => {
    const fetchRealTimePrice = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/quote/${symbol}`);
        const data = response.data;
        if (
          data &&
          data.quoteResponse &&
          data.quoteResponse.result.length > 0
        ) {
          const quote = data.quoteResponse.result[0];
          setPrice(quote.regularMarketPrice);
          setVolume(quote.regularMarketVolume);
          setChange(quote.regularMarketChangePercent);
        } else {
          console.error('No data available for the given symbol.');
        }
      } catch (error) {
        console.error('Error fetching real-time price:', error);
      }
    };

    fetchRealTimePrice();
    const interval = setInterval(fetchRealTimePrice, 60000);

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className={styles.realTimePrice}>
      <h2>リアルタイム価格</h2>
      {price !== null ? (
        <div>
          <p>価格: {price}</p>
          <p>取引量: {volume}</p>
          <p>変動率: {change}%</p>
        </div>
      ) : (
        <p>データを取得中...</p>
      )}
    </div>
  );
};
