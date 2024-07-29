import '@radix-ui/themes/styles.css';
import '@/styles/globals.css';
import Layout from '@/layouts/Layout';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
