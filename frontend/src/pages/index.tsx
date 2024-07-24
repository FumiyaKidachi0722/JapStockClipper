// src/pages/index.tsx
import React from 'react';
import { Layout } from '@/components/templates/Layout';
import { Form } from '@/components/organisms/Form';

const HomePage: React.FC = () => {
  const handleSubmit = () => {
    console.log('Form submitted');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Welcome to JapStockClipper!</h1>
      <Form onSubmit={handleSubmit} />
    </Layout>
  );
};

export default HomePage;
