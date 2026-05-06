import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Agenda from "./Agenda/AgendaCalendario.jsx";
import App from "./App.jsx";
import Home from "./DashbordHome/Home.jsx";
import "./index.css";
import GerarOrdemServico from "./OrdensDeServico/GerarOrdemServico.jsx";
import OrdemServico from "./OrdensDeServico/OrdemServico.jsx";
import Layout from "./SideBarMain/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // O Layout abraça todo mundo
    children: [
      {
        path: "/",
        element: <Home />,
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
      {
        path: "/gerarordemservico",
        element: <GerarOrdemServico />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
