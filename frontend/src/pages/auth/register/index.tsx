// frontend/src/pages/auth/register/index.tsx

import React from 'react';

import { RegisterForm } from '@/components/organisms/RegisterForm';
import { Layout } from '@/components/templates/Layout';

import styles from './Register.module.css';

const Register = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
