// frontend/src/components/organisms/LoginForm/index.tsx

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ErrorMessage } from '@/components/atoms/ErrorMessage';
import { Heading } from '@/components/atoms/Heading';
import { Label } from '@/components/atoms/Label';
import { FormActions } from '@/components/molecules/FormActions';
import { auth } from '@/firebase/initialize';

import styles from './LoginForm.module.css';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user: ', user);
        router.push('/');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          alert('入力された内容は正しくありません。');
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Heading level={1} label="ログイン" />
      <div className={styles.formGroup}>
        <Label htmlFor="email" text="Email" />
        <input
          {...register('email', {
            required: 'メールアドレスは必須です。',
            pattern: {
              value:
                /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              message: '不適切なメールアドレスです。',
            },
          })}
          type="text"
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

      <FormActions
        buttonText="ログイン"
        linkText="新規登録ページへ"
        linkHref="/auth/register"
        message="はじめてのご利用の方はこちら"
      />
    </form>
  );
};
