export default function DashboardCards() {
  return (
    // Removi o fundo e a altura fixa. Agora ele é um grid flexível de 4 colunas.
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {/* CARD 1: Saúde Global dos Ativos */}
      <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-sm hover:shadow-md transition-shadow group bg-white">
        <div className="absolute top-1/2 left-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#ec4899_25%,#8b5cf6_50%,#3b82f6_75%,transparent_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 h-full w-full bg-white rounded-[14px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-slate-500">
                Saúde Global dos Ativos
              </h3>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
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
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  <polyline points="12 8 12 12 14 14" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">87.4%</p>
          </div>

          <div className="mt-6 flex items-center text-sm">
            <span className="flex items-center text-emerald-500 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 7-7 7 7" />
                <path d="M12 19V5" />
              </svg>
              2.1%
            </span>
            <span className="text-slate-400 ml-2">vs mês anterior</span>
          </div>
        </div>
      </div>

      {/* CARD 2: Eficiência do PCM */}
      <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-sm hover:shadow-md transition-shadow group bg-white">
        <div className="absolute top-1/2 left-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#ec4899_25%,#8b5cf6_50%,#3b82f6_75%,transparent_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 h-full w-full bg-white rounded-[14px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-slate-500">
                Eficiência do PCM
              </h3>
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
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
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">92%</p>
          </div>

          <div className="mt-8">
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full"
                style={{ width: "92%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 3: OS Atrasadas */}
      <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-sm hover:shadow-md transition-shadow group bg-white">
        <div className="absolute top-1/2 left-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#ef4444_25%,#f97316_50%,#ef4444_75%,transparent_100%)] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 h-full w-full bg-white rounded-[14px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-slate-500">
                OS Atrasadas
              </h3>
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
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
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-red-500">3</p>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            Risco crítico no plano principal
          </div>
        </div>
      </div>

      {/* CARD 4: IA Auto-Schedule (O Destaque Premium) */}
      <div className="relative overflow-hidden rounded-2xl p-[2px] shadow-lg hover:shadow-xl transition-shadow group bg-slate-900">
        {/* Borda animada focada no laranja/vermelho para combinar com a IA */}
        <div className="absolute top-1/2 left-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,#f97316_25%,#ea580c_50%,#f97316_75%,transparent_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 h-full w-full bg-slate-900 rounded-[14px] p-6 flex flex-col justify-between overflow-hidden">
          {/* Marca d'água do Robô no fundo */}
          <div className="absolute -bottom-6 -right-4 opacity-10 text-white pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </div>

          <div className="relative z-20">
            <div className="flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-orange-500 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
              </svg>
              <h3 className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">
                Kaizen AI Auto-Schedule
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">12 OS Geradas</p>
          </div>

          <div className="mt-4 text-sm text-slate-400 relative z-20 leading-relaxed">
            Baseado em tempo de uso e falhas previstas para esta semana.
          </div>
        </div>
      </div>
    </div>
  );
}
