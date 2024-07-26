// frontend/src/components/organisms/RegisterForm/index.tsx

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Heading } from '@/components/atoms/Heading';
import { Label } from '@/components/atoms/Label';
import { FormActions } from '@/components/molecules/FormActions';
import { useAuth } from '@/hooks/authService';

import styles from './RegisterForm.module.css';

type Inputs = {
  email: string;
  password: string;
  userID: string;
  userName: string;
};

export const RegisterForm: React.FC = () => {
  const { create } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await create(
      data.email,
      data.password,
      1, // デフォルトのrole
      data.userID,
      data.userName,
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Heading level={1} label="新規登録" />
      <div className={styles.formGroup}>
        <Label htmlFor="email" text="Email" />
        <input
          {...register('email', {
            required: 'メールアドレスは必須です。',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: '不適切なメールアドレスです。',
            },
          })}
          type="email"
          className={styles.input}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
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
        <Label htmlFor="userName" text="UserName" />
        <input
          {...register('userName', {
            required: 'ユーザー名は必須です。',
            maxLength: {
              value: 50,
              message: 'ユーザー名は50文字以内で入力してください。',
            },
          })}
          type="text"
          className={styles.input}
        />
        {errors.userName && <ErrorMessage message={errors.userName.message} />}
      </div>
      <FormActions
        buttonText="新規登録"
        linkText="ログインページへ"
        linkHref="/auth/login"
        message="既にアカウントをお持ちですか？"
      />
    </form>
  );
};
