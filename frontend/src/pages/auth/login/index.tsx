// frontend/src/pages/auth/login/index.tsx

import React from 'react';

import { LoginForm } from '@/components/organisms/LoginForm';
import { Layout } from '@/components/templates/Layout';

import styles from './Login.module.css';

const Login = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
