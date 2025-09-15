// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Login from './components/auth/Login'
// import Register from './components/auth/Register'

// const router = createBrowserRouter([
//   { path: '/', element: <App /> },
//   { path: '/login', element: <Login /> },
//   { path: '/register', element: <Register /> },
// ])

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

// React Query importlari
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Router
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

// React Query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* Optional: debug qilish uchun */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
