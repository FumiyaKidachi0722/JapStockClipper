// src/components/templates/Layout/index.tsx
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-gray-800 text-white">Header</header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="p-4 bg-gray-800 text-white">Footer</footer>
    </div>
  );
};
