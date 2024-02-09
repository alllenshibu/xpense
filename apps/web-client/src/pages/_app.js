import '@/styles/globals.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN);
      if (!token && router.pathname !== '/login' && router.pathname !== '/signup')
        router.push('/login');
    }
  }, []);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-NGDNMMTPP5" />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date()); gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
        `}
      </Script>
      <Component {...pageProps} />;
    </>
  );
}
