// frontend/src/components/atoms/ErrorMessage/index.tsx

import React from 'react';

import styles from './ErrorMessage.module.css';

type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <span className={styles.error}>{message}</span>;
};
