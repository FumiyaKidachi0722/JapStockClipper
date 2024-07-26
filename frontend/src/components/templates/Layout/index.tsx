import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

interface DecodedToken {
  exp: number;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    router.push('/auth/login');
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        setIsLoggedIn(true);
        const timeout = (decodedToken.exp - currentTime) * 1000;
        const timer = setTimeout(() => {
          handleLogout();
        }, timeout);

        return () => clearTimeout(timer);
      } else {
        handleLogout();
      }
    }
  }, [handleLogout]);

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className={styles.container}>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      >
        <nav className={styles.nav}>
          <div className={styles.leftNav}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link href="/about" className={styles.link}>
              About
            </Link>
            <Link href="/contact" className={styles.link}>
              Contact
            </Link>
          </div>
          <div className={styles.rightNav}>
            {isLoggedIn ? (
              <>
                <FaUserCircle className={styles.icon} />
                <button onClick={handleLogout} className={styles.button}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <button onClick={handleLogin} className={styles.button}>
                <FaSignInAlt />
                Login
              </button>
            )}
          </div>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};
