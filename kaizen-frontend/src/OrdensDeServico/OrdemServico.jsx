import { useNavigate } from "react-router-dom";
import BarChart from "../Graficos/BarChart";

function OrdensDeServico() {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-8">
      {/* ================= CABEÇALHO E BARRA DE AÇÕES ================= */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        {/* Titulo */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Painel Ordens de Serviço
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Gerencie e acompanhe todas as ordens de serviço
          </p>
        </div>

        {/* Barra de Controles (Pesquisa, Data e Botão) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          {/* Pesquisar */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm placeholder:text-slate-400"
              placeholder="Buscar por n° ou tag..."
            />
          </div>

          {/* Data */}
          <div className="w-full sm:w-auto">
            <input
              type="date"
              className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
            />
          </div>

          {/* Botão Principal */}
          <button
            onClick={() => navigate("/gerarordemservico")}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Nova OS
          </button>
        </div>
      </div>

      {/* ================= MEIO: FILTROS E GRÁFICO ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full items-start">
        {/* Menu Lateral de Filtros (Estilo Navegação Premium) */}
        <div className="lg:col-span-1 flex flex-col bg-white shadow-sm border border-slate-100 rounded-2xl w-full p-2">
          <nav className="flex flex-col gap-1 text-sm font-medium text-slate-600">
            {/* Ativo */}
            <button className="flex items-center justify-between w-full p-3 rounded-xl bg-blue-50 text-blue-700 transition-colors">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Todas as OS
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100/50 text-blue-700 text-xs font-bold">
                15
              </span>
            </button>

            {/* Inativo */}
            <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <div className="flex items-center gap-3 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Em andamento
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                356
              </span>
            </button>

            <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <div className="flex items-center gap-3 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Executadas
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                1565
              </span>
            </button>

            <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors">
              <div className="flex items-center gap-3 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reprogramadas
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                1516
              </span>
            </button>

            <button className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors">
              <div className="flex items-center gap-3 text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Canceladas
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold">
                36
              </span>
            </button>
          </nav>
        </div>

        {/* Gráfico */}
        <div className="lg:col-span-3 bg-white p-6 shadow-sm border border-slate-100 rounded-2xl w-full">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Relatório Manutenção Mensal
          </h2>
          <div className="w-full">
            <BarChart />
          </div>
        </div>
      </div>

      {/* ================= TABELA DE ORDENS DE SERVIÇO ================= */}
      <div className="bg-white shadow-sm border border-slate-100 rounded-2xl w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            {/* Cabeçalho */}
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6 flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  OS / Equipamento
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </th>
                <th className="py-4 px-6">Tipo</th>
                <th className="py-4 px-6">Prioridade</th>
                <th className="py-4 px-6 flex items-center gap-1 cursor-pointer hover:text-slate-600">
                  Data Criação
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m7 15 5 5 5-5" />
                    <path d="m7 9 5-5 5 5" />
                  </svg>
                </th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Ações</th>
              </tr>
            </thead>

            {/* Corpo da Tabela */}
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                {/* Coluna 1: OS, Tag e Técnico */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">
                        OS #452{" "}
                        <span className="text-slate-400 font-normal mx-1">
                          •
                        </span>{" "}
                        TC-102
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Resp: Jin-Woo
                      </div>
                    </div>
                  </div>
                </td>

                {/* Coluna 2: Tipo com Ícone */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                    Preventiva
                  </div>
                </td>

                {/* Coluna 3: Prioridade (Crítica) */}
                <td className="py-4 px-6">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                    Alta
                  </span>
                </td>

                {/* Coluna 4: Data com Ícone */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-slate-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    15/02/2026
                  </div>
                </td>

                {/* Coluna 5: Status (Pílula com bolinha) */}
                <td className="py-4 px-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    Atrasado
                  </span>
                </td>

                {/* Coluna 6: Ações */}
                <td className="py-4 px-6 text-center">
                  <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PAGINAÇÃO ================= */}
      <div className="flex justify-center mt-2 mb-8">
        <nav aria-label="Navegação da tabela">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-slate-500 bg-white border border-e-0 border-slate-200 rounded-s-lg hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                <span className="sr-only">Anterior</span>
                <svg
                  className="w-4 h-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 19-7-7 7-7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors font-bold"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-slate-500 bg-white border border-slate-200 rounded-e-lg hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                <span className="sr-only">Próximo</span>
                <svg
                  className="w-4 h-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default OrdensDeServico;
