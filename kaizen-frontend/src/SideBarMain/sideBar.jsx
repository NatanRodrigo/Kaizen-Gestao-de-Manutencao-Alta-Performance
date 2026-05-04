import {
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  CubeIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/kaizenlogo1.png";

const navigation = [
  { name: "Inicio", href: "/", icon: HomeIcon, current: true },
  {
    name: "Ordens de Serviço",
    href: "/ordenservico",
    icon: WrenchScrewdriverIcon,
    current: false,
  },
  {
    name: "Equipamentos",
    href: "/equipamentos",
    icon: CubeIcon,
    current: false,
  },
  {
    name: "Preventivas",
    href: "/preventivas",
    icon: ClipboardDocumentCheckIcon,
    current: false,
  },
  {
    name: "Corretivas",
    href: "/corretivas",
    icon: ClipboardDocumentCheckIcon,
    current: false,
  },
  {
    name: "Calendario",
    href: "/corretivas",
    icon: ClipboardDocumentCheckIcon,
    current: false,
  },
  {
    name: "Relatórios",
    href: "/relatorios",
    icon: ChartBarIcon,
    current: false,
  },
  { name: "Mecânicos", href: "/mecanicos", icon: ChartBarIcon, current: false },
  {
    name: "Eletricistas",
    href: "/eletricistas",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Cadastrar Usuário",
    href: "/usuarios",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Desempenho Equipamentos",
    href: "/desempenho-equipamentos",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Desempenho Mecânicos",
    href: "/desempenho-mecanicos",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Desempenho Eletricistas",
    href: "/desempenho-eletricistas",
    icon: ChartBarIcon,
    current: false,
  },
  {
    name: "Configurações",
    href: "/configuracoes",
    icon: Cog6ToothIcon,
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState(navigation);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleMenuClick = (clickedItem) => {
    setMenuItems(
      menuItems.map((item) => ({
        ...item,
        current: item.name === clickedItem.name,
      })),
    );
  };

  return (
    <div
      className={classNames(
        isExpanded ? "w-72" : "w-20",
        "flex h-screen flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 relative print:hidden",
      )}
    >
      {/* Botão de Toggle Flutuante */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
      >
        {isExpanded ? (
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {/* Área da Logo */}
      <div
        className={classNames(
          "flex h-20 shrink-0 items-center bg-slate-950 transition-all duration-300",
          isExpanded ? "px-6" : "px-0 justify-center",
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-tr flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <img
              src={Logo}
              alt="Kaizen Logo"
              className="h-full w-full object-contain"
            />
          </div>
          {isExpanded && (
            <span className="text-white font-bold text-xl tracking-wide whitespace-nowrap">
              KAIZEN
            </span>
          )}
        </div>
      </div>

      {/* Navegação - Classes ajustadas aqui para esconder a barra */}
      <nav className="flex flex-1 flex-col px-4 py-6 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            {isExpanded && (
              <div className="text-xs font-semibold leading-6 text-slate-400 uppercase tracking-wider mb-2 whitespace-nowrap">
                Gestão de Manutenção
              </div>
            )}
            <ul role="list" className="-mx-2 space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => handleMenuClick(item)}
                    title={!isExpanded ? item.name : undefined}
                    className={classNames(
                      item.current
                        ? "bg-slate-800 text-cyan-400"
                        : "text-slate-300 hover:text-white hover:bg-slate-800",
                      isExpanded ? "px-3" : "justify-center px-0",
                      "group flex items-center gap-x-3 rounded-lg py-3 text-sm leading-6 font-medium transition-all duration-200",
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-cyan-400"
                          : "text-slate-400 group-hover:text-white",
                        "h-6 w-6 shrink-0 transition-colors duration-200",
                      )}
                      aria-hidden="true"
                    />
                    {isExpanded && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>

      {/* Perfil do Usuário no rodapé */}
      <div
        className={classNames(
          "mt-auto bg-slate-950 p-4 transition-all duration-300",
          isExpanded ? "px-4" : "px-2 flex justify-center",
        )}
      >
        <a
          href="#"
          title={!isExpanded ? "Perfil de Natan Rodrigo" : undefined}
          className={classNames(
            "flex items-center gap-x-4 py-2 text-sm font-semibold leading-6 text-white hover:bg-slate-800 rounded-lg transition-colors",
            isExpanded ? "px-2" : "justify-center px-0",
          )}
        >
          <div className="h-9 w-9 shrink-0 rounded-full bg-slate-700 flex items-center justify-center text-cyan-400 font-bold border border-slate-600 cursor-pointer">
            NR
          </div>
          {isExpanded && (
            <div className="flex flex-col overflow-hidden">
              <span aria-hidden="true" className="whitespace-nowrap">
                Natan Rodrigo
              </span>
              <span className="text-xs text-slate-400 font-normal whitespace-nowrap">
                Administrador
              </span>
            </div>
          )}
        </a>
      </div>
    </div>
  );
}
