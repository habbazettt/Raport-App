import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import DetailsPage from './DetailsPage.jsx'
import StatusPage from './StatusPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/status/:nim',
    element: <StatusPage />
  },
  {
    path: '/raport/:nim',
    element: <DetailsPage />,
  },
  {
    path: '*',
    element: <div>404</div>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
