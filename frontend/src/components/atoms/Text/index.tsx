// frontend/src/components/atoms/Text/index.tsx

import React from 'react';

import styles from './Text.module.css';

type TextProps = {
  className?: string;
  children: React.ReactNode;
};

export const Text: React.FC<TextProps> = ({ className, children }) => {
  return <span className={`${styles.text} ${className}`}>{children}</span>;
};
