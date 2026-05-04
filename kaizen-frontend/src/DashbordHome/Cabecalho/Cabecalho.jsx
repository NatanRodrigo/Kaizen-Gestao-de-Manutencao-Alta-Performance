export default function Cabecalho() {
  return (
    // Container principal com padding e uma borda bem suave embaixo
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center w-full pb-6 mb-6 border-b border-slate-200/60 gap-4">
      {/* Lado Esquerdo: Títulos */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Dashboard Preditivo
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Visão geral de saúde e manutenção de ativos
        </p>
      </div>

      {/* Lado Direito: Ações (Totalmente Clean) */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Botão de Notificação (Com a bolinha laranja) */}
        <button className="relative flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-slate-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 border-2 border-white rounded-full box-content"></span>
        </button>

        {/* Botão Nova OS */}
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 px-5 rounded-xl shadow-sm hover:shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
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
    </header>
  );
}
