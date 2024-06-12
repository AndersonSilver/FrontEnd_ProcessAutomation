import { AppContext } from '@/context/AppContext'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PRIVATE_ROUTES } from './private/private.route'
import { PUBLIC_ROUTES } from './public/public.route'

const router = createBrowserRouter([
  { element: <AppContext />, children: [...PUBLIC_ROUTES] },
  { element: <AppContext />, children: [...PRIVATE_ROUTES] },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
