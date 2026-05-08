import {
  ArrowRightOnRectangleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  CubeIcon,
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/kaizenlogo1.png";
// Estrutura de dados remodelada com submenus
const navigation = [
  { name: "Início", href: "/", icon: HomeIcon },
  {
    name: "Ordens de Serviço",
    href: "/ordenservico",
    icon: WrenchScrewdriverIcon,
  },
  { name: "Equipamentos", href: "/equipamentos", icon: CubeIcon },
  { name: "Calendário", href: "/agenda", icon: CalendarDaysIcon },
  {
    name: "Manutenções",
    icon: ClipboardDocumentCheckIcon,
    subItems: [
      { name: "Preventivas", href: "/preventiva" },
      { name: "Corretivas", href: "/corretiva" },
    ],
  },
  {
    name: "Equipe",
    icon: UsersIcon,
    subItems: [
      { name: "Mecânicos", href: "/mecanicos" },
      { name: "Eletricistas", href: "/eletricistas" },
      { name: "Cadastrar Usuário", href: "/cadastrouser" },
    ],
  },
  {
    name: "Desempenho",
    icon: ChartBarIcon,
    subItems: [
      { name: "Relatório Geral", href: "/relatorios" },
      { name: "Equipamentos", href: "/desempenho-equipamentos" },
      { name: "Mecânicos", href: "/desempenho-mecanicos" },
      { name: "Eletricistas", href: "/desempenho-eletricistas" },
    ],
  },
  { name: "Configurações", href: "/configuracoes", icon: Cog6ToothIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openGroups, setOpenGroups] = useState({});
  const location = useLocation(); // Lê a URL atual

  // Verifica se um item simples está ativo
  const isActive = (href) => location.pathname === href;

  // Verifica se algum sub-item do grupo está ativo
  const isGroupActive = (subItems) =>
    subItems.some((item) => isActive(item.href));

  // Abre automaticamente o grupo se o usuário recarregar a página numa rota filha
  useEffect(() => {
    const novosGruposAbertos = { ...openGroups };
    navigation.forEach((item) => {
      if (item.subItems && isGroupActive(item.subItems)) {
        novosGruposAbertos[item.name] = true;
      }
    });
    setOpenGroups(novosGruposAbertos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleGroup = (name) => {
    if (!isExpanded) setIsExpanded(true); // Força a sidebar a abrir se clicar num grupo fechado
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div
      className={classNames(
        isExpanded ? "w-72" : "w-20",
        "flex h-screen flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 relative print:hidden shadow-xl",
      )}
    >
      {/* Botão de Toggle Flutuante */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-7 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10 shadow-sm"
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
          "flex h-20 shrink-0 items-center bg-slate-950 border-b border-slate-800/50 transition-all duration-300",
          isExpanded ? "px-6" : "px-0 justify-center",
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden cursor-pointer">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
            {/* Se o seu logo for uma imagem branca, ela fica top com esse fundo gradiente */}
            <img src={Logo} alt="Kaizen" className="h-6 w-6 object-contain" />
          </div>
          {isExpanded && (
            <span className="text-white font-black text-2xl tracking-tight whitespace-nowrap">
              KAIZEN
            </span>
          )}
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex flex-1 flex-col px-3 py-6 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul role="list" className="flex flex-col gap-y-1.5">
          {navigation.map((item) => {
            const active = item.subItems
              ? isGroupActive(item.subItems)
              : isActive(item.href);

            return (
              <li key={item.name}>
                {/* ITEM COM SUBMENU */}
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleGroup(item.name)}
                      className={classNames(
                        active
                          ? "bg-slate-800/50 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800",
                        isExpanded ? "px-3" : "justify-center px-0",
                        "w-full group flex items-center justify-between rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
                      )}
                      title={!isExpanded ? item.name : undefined}
                    >
                      <div className="flex items-center gap-x-3">
                        <item.icon
                          className={classNames(
                            active
                              ? "text-blue-500"
                              : "text-slate-400 group-hover:text-slate-300",
                            "h-5 w-5 shrink-0 transition-colors duration-200",
                          )}
                          aria-hidden="true"
                        />
                        {isExpanded && (
                          <span className="whitespace-nowrap">{item.name}</span>
                        )}
                      </div>
                      {isExpanded && (
                        <ChevronDownIcon
                          className={classNames(
                            openGroups[item.name] ? "rotate-180" : "",
                            "h-4 w-4 text-slate-500 transition-transform duration-200",
                          )}
                        />
                      )}
                    </button>

                    {/* SUB-ITENS (Sanfona) */}
                    {isExpanded && openGroups[item.name] && (
                      <ul className="mt-1 mb-2 space-y-1 border-l border-slate-700 ml-5 pl-3">
                        {item.subItems.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              to={sub.href}
                              className={classNames(
                                isActive(sub.href)
                                  ? "text-blue-400 font-bold"
                                  : "text-slate-400 hover:text-white hover:bg-slate-800",
                                "block rounded-lg px-3 py-2 text-sm transition-colors duration-200 whitespace-nowrap",
                              )}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  /* ITEM SIMPLES (Sem submenu) */
                  <Link
                    to={item.href}
                    title={!isExpanded ? item.name : undefined}
                    className={classNames(
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                      isExpanded ? "px-3" : "justify-center px-0",
                      "group flex items-center gap-x-3 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
                    )}
                  >
                    <item.icon
                      className={classNames(
                        active
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-300",
                        "h-5 w-5 shrink-0 transition-colors duration-200",
                      )}
                      aria-hidden="true"
                    />
                    {isExpanded && (
                      <span className="whitespace-nowrap">{item.name}</span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* RODAPÉ (Perfil + Info do Sistema) */}
      <div className="mt-auto bg-slate-950 border-t border-slate-800/50">
        <div
          className={classNames(
            "p-4 flex items-center justify-between transition-all duration-300",
            isExpanded ? "flex-row" : "flex-col gap-4",
          )}
        >
          {/* Perfil */}
          <div className="flex items-center gap-x-3 cursor-pointer group">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 font-extrabold text-sm border border-slate-700 group-hover:border-blue-500 transition-colors">
              NR
            </div>
            {isExpanded && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white whitespace-nowrap group-hover:text-blue-400 transition-colors">
                  Natan Rodrigo
                </span>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                  Administrador
                </span>
              </div>
            )}
          </div>

          {/* Botão de Logout (Sutil) */}
          <button
            title="Sair do sistema"
            className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-slate-900"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Versão do Sistema */}
        {isExpanded && (
          <div className="px-4 pb-4 text-[10px] font-bold tracking-widest text-slate-600 uppercase text-center">
            Kaizen OS • v1.0.0
          </div>
        )}
      </div>
    </div>
  );
}
