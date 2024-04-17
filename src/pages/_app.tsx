import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const { '@nextAuth.Authorization': authToken, '@nextAuth.AuthorizationRA': authTokenRA } = parseCookies();
    if ((!authToken || !authTokenRA) && router.pathname !== '/') {
      router.push('/');
    }
  }, [router.pathname]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}

export default MyApp;
