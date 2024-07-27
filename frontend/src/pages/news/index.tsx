// frontend/src/pages/news/index.tsx

import React from 'react';

import { Heading } from '@/components/atoms/Heading';
import { Layout } from '@/components/templates/Layout';

const NewsPage: React.FC = () => {
  return (
    <Layout>
      <Heading level={1} label="ニュースページ" />
      <section>
        <Heading level={2} label="ニュースリスト" />
        {/* ニュースリストのコンポーネントをここに追加 */}
      </section>
    </Layout>
  );
};

export default NewsPage;
