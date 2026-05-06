import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

// Ele recebe a prop 'isExpanded' da Sidebar principal para saber se deve mostrar os nomes ou só os ícones
export default function RodapeSidebar({ isExpanded }) {
  return (
    <div className="mt-auto bg-slate-950 border-t border-slate-800/50 w-full shrink-0">
      <div
        className={`p-4 flex items-center justify-between transition-all duration-300 ${isExpanded ? "flex-row" : "flex-col gap-4"}`}
      >
        {/* Perfil do Usuário */}
        <div className="flex items-center gap-x-3 cursor-pointer group">
          {/* Avatar */}
          <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 font-extrabold text-sm border border-slate-700 group-hover:border-blue-500 transition-colors">
            NR
          </div>

          {/* Textos (Some quando a sidebar retrai) */}
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

        {/* Botão de Logout */}
        <button
          title="Sair do sistema"
          className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-slate-900"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Versão do Sistema (Some quando a sidebar retrai) */}
      {isExpanded && (
        <div className="px-4 pb-4 text-[10px] font-bold tracking-widest text-slate-600 uppercase text-center">
          Kaizen OS • v1.0.0
        </div>
      )}
    </div>
  );
}
