import Link from 'next/link';
import React from 'react';

import styles from './LinkButton.module.css';

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

export const LinkButton: React.FC<LinkButtonProps> = ({ href, children }) => {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
};
