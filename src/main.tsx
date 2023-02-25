import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// https://kit.suiet.app/docs/QuickStart
// import { WalletProvider } from '@suiet/wallet-kit';
import { WalletKitProvider } from '@mysten/wallet-kit';
import '../styles/global.css';

if (window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.add('dark');
else document.documentElement.classList.add('light');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletKitProvider>
      <App />
    </WalletKitProvider>
  </React.StrictMode>
);
