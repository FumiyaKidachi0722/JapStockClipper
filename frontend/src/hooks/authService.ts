// frontend/src/hooks/authService.ts

import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { auth, signOut } from '@/utils/firebase';

export const useAuth = () => {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        // ここでバックエンドのエンドポイントを使用してトークンの有効性を検証することもできます。
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const create = async (
    email: string,
    password: string,
    role: number,
    userID: string,
    userName: string,
  ) => {
    try {
      await axios.post(`${backendUrl}/api/auth/register`, {
        email,
        password,
        role,
        userID,
        userName,
      });

      alert('登録に成功しました');
      router.push('/auth/login');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          alert('このメールアドレスは既に利用されています。');
        } else {
          alert(error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const login = async (userID: string, password: string) => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        userID,
        password,
      });
      const token = response.data.access_token;
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      alert('Login successful');
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-credential') {
          alert('入力された内容は正しくありません。');
        } else {
          alert(error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const logout = () => {
    signOut(auth);
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.push('/auth/login');
  };

  return { create, login, logout, isAuthenticated, loading };
};
