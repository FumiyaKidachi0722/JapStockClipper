// frontend/src/components/organisms/LoginForm/index.tsx

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Heading } from '@/components/atoms/Heading';
import { Label } from '@/components/atoms/Label';
import { FormActions } from '@/components/molecules/FormActions';
import { useAuth } from '@/hooks/authService';

import styles from './LoginForm.module.css';

type Inputs = {
  userID: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data.userID, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Heading level={1} label="ログイン" />
      <div className={styles.formGroup}>
        <Label htmlFor="userID" text="UserID" />
        <input
          {...register('userID', {
            required: 'UserIDは必須です。',
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
              message: 'UserIDは英数字と記号のみ使用できます。',
            },
          })}
          type="text"
          className={styles.input}
        />
        {errors.userID && <ErrorMessage message={errors.userID.message} />}
      </div>
      <div className={styles.formGroup}>
        <Label htmlFor="password" text="Password" />
        <input
          {...register('password', {
            required: 'パスワードは必須です。',
            minLength: {
              value: 6,
              message: 'パスワードは6桁以上で入力してください。',
            },
          })}
          type="password"
          className={styles.input}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <FormActions
        buttonText="ログイン"
        linkText="新規登録ページへ"
        linkHref="/auth/register"
        message="はじめてのご利用の方はこちら"
      />
    </form>
  );
};
