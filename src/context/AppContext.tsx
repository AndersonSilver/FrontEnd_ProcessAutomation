import { Interceptors } from '@/config/Interceptors'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './AuthContext'

export function AppContext() {
  return (
    <AuthProvider>
      <Interceptors />
      <ToastContainer autoClose={3000} />

      <Outlet />
    </AuthProvider>
  )
}
