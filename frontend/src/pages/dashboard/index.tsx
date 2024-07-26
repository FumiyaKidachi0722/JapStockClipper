// frontend/src/pages/dashboard.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Heading } from '@/components/atoms/Heading';
import { Layout } from '@/components/templates/Layout';
import { useAuth } from '@/hooks/authService';

const Dashboard = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/login'); // 未ログインの場合はログインページへリダイレクト
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return <div>Loading...</div>; // 認証状態の確認中のローディング表示
  }

  return (
    <Layout>
      <Heading level={1} label="Dashboard" />
    </Layout>
  );
};

export default Dashboard;
