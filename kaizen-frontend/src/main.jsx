import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import OrdemServico from "./OrdensDeServico/GerarOrdemServico.jsx";
import Layout from "./SideBarMain/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // O Layout abraça todo mundo
    children: [
      {
        path: "/",
        element: <div>Página de Início (Dashboard) - Em breve</div>,
      },
      {
        // Movido para DENTRO do children!
        // Agora o App vai ser injetado no Outlet lá do Layout
        path: "/equipamentos",
        element: <App />,
      },
      {
        path: "/ordenservico",
        element: <OrdemServico />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
