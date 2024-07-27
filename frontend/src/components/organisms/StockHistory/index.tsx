// frontend/src/components/organisms/StockHistory/index.tsx

import React from 'react';

import { Heading } from '@/components/atoms/Heading';

import styles from './StockHistory.module.css';

type StockHistoryProps = {
  history: { date: string; price: number; volume: number }[];
};

export const StockHistory: React.FC<StockHistoryProps> = ({ history }) => {
  return (
    <div className={styles.stockHistory}>
      <Heading level={2} label="株価履歴データ" />
      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>価格</th>
            <th>取引量</th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.price}</td>
              <td>{record.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
