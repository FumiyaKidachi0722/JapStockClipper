// frontend/src/pages/auth/register/index.tsx

import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect } from 'react';

import { RegisterForm } from '@/components/organisms/RegisterForm';
import { Layout } from '@/components/templates/Layout';
import { useAuth } from '@/hooks/authService';

import styles from './Register.module.css';

const Register = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard'); // ログインしている場合のリダイレクト先
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>; // 認証状態の確認中のローディング表示
  }
  return (
    <Layout>
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
