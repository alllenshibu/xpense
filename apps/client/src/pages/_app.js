import '@/styles/globals.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
      if (!token && router.pathname !== '/login' && router.pathname !== '/signup')
        router.push('/login');
    }
  }, []);

  return <Component {...pageProps} />;
}
