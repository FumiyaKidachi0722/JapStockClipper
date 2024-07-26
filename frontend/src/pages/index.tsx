// src/pages/index.tsx
import React from 'react';

import { Heading } from '@/components/atoms/Heading';
import { Layout } from '@/components/templates/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Heading level={1} label="Welcome to JapStockClipper!" />
    </Layout>
  );
};

export default HomePage;
