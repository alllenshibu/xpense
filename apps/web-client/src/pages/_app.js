import '@radix-ui/themes/styles.css';
import Layout from '@/layouts/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
