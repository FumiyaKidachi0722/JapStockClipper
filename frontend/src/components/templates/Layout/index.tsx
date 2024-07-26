// src/components/templates/Layout/index.tsx

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
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

  const handleLogin = () => {
    router.push('/auth/login');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
