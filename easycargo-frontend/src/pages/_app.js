import '../styles/global.css';
import LayoutComponent from '../components/Layout/LayoutComponent';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EasyCargo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  );
}

export default MyApp;
