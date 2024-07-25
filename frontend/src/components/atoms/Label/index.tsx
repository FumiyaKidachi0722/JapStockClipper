// frontend/src/components/atoms/Label/index.tsx

import React from 'react';

import styles from './Label.module.css';

type LabelProps = {
  htmlFor: string;
  text: string;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {text}
    </label>
  );
};
