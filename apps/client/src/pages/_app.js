import '@/styles/globals.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token && router.pathname !== '/login' && router.pathname !== '/signup')
        router.push('/login');
    }
  }, []);

  return <Component {...pageProps} />;
}
