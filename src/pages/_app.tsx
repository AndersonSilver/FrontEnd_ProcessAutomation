import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { Interceptors } from '../config/Interceptors'
import { AuthProvider } from '../context/AuthContext'

import 'react-toastify/dist/ReactToastify.css'
import '../../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Interceptors />
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}

export default MyApp
