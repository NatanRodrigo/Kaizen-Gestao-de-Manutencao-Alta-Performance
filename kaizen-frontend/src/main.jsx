import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SideBarM from './SideBarMain/sideBar.jsx'

const router = createBrowserRouter([
  {
    path: "/registros-de-equipamentos",
    element: <App />
  },
  {
    path: "/side",
    element: <SideBarM />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
