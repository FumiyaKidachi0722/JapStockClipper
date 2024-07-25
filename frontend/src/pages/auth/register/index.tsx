// frontend/src/pages/auth/register/index.tsx

import React from 'react';

import { RegisterForm } from '@/components/organisms/RegisterForm';

import styles from './Register.module.css';

const Register = () => {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
};

export default Register;
