// frontend/src/pages/finance/index.tsx

import React from 'react';

import { Heading } from '@/components/atoms/Heading';
import { Layout } from '@/components/templates/Layout';

const FinancePage: React.FC = () => {
  return (
    <Layout>
      <Heading level={1} label="財務データページ" />
      <section>
        <Heading level={2} label="財務諸表" />
        {/* 財務諸表のコンポーネントをここに追加 */}
      </section>
      <section>
        <Heading level={2} label="財務指標" />
        {/* 財務指標のコンポーネントをここに追加 */}
      </section>
    </Layout>
  );
};

export default FinancePage;
