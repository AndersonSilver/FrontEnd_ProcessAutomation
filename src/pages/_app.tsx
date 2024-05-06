import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../context/AuthContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorizationRA, setAuthorizationRA] = useState("");
  const [authorization, setAuthorization] = useState("");
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    setAuthorizationRA(localStorage.getItem("AuthorizationRA") || "");
    setAuthorization(localStorage.getItem("Authorization") || "");
    setIsAuthLoaded(true);
  }, []);

  useEffect(() => {
    if (isAuthLoaded && !authorizationRA && !authorization && router.pathname !== '/') {
      router.push('/');
    }
  }, [router.pathname, isAuthLoaded, authorizationRA, authorization]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}

export default MyApp;
