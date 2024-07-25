// frontend/src/components/atoms/Heading/index.tsx

import React from 'react';

import styles from './Heading.module.css';

type HeadingProps = {
  level: number;
  label: string;
};

export const Heading: React.FC<HeadingProps> = ({ level, label }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = styles[`h${level}`];

  return <Tag className={className}>{label}</Tag>;
};
