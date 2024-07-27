// frontend/src/components/organisms/TechnicalAnalysis/index.tsx

import React from 'react';

import { Heading } from '@/components/atoms/Heading';

import styles from './TechnicalAnalysis.module.css';

type TechnicalAnalysisProps = {
  rsi: number;
  macd: number;
};

export const TechnicalAnalysis: React.FC<TechnicalAnalysisProps> = ({
  rsi,
  macd,
}) => {
  return (
    <div className={styles.technicalAnalysis}>
      <Heading level={2} label="テクニカル分析ツール" />
      <p>RSI: {rsi}</p>
      <p>MACD: {macd}</p>
    </div>
  );
};
