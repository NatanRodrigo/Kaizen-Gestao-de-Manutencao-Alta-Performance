import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// Dados falsos para o gráfico de linhas
const dataGrafico = [
  { name: "Seg", risco: 12, falhas: 8 },
  { name: "Ter", risco: 19, falhas: 10 },
  { name: "Qua", risco: 15, falhas: 14 },
  { name: "Qui", risco: 25, falhas: 12 },
  { name: "Sex", risco: 22, falhas: 16 },
  { name: "Sáb", risco: 30, falhas: 15 },
  { name: "Dom", risco: 28, falhas: 18 },
];

export default function DashboardPainel() {
  // Estado para disparar as animações manuais ao carregar a página
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    // Atrasa a animação em 100ms para dar tempo de renderizar e o usuário ver o efeito
    const timer = setTimeout(() => setAnimar(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Variáveis para calcular a circunferência do gráfico de rosca animado
  const raio = 40;
  const circunferencia = 2 * Math.PI * raio;
  const porcentagemConcluida = 78;
  const offsetRosca = animar
    ? circunferencia - (porcentagemConcluida / 100) * circunferencia
    : circunferencia;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mt-6">
      {/* ================= PAINEL 1: GRÁFICO DE PREVISÃO (Ocupa 2 colunas) ================= */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-96">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Previsão de Falhas vs Tempo de Uso
            </h2>
            <p className="text-sm text-slate-500">
              Análise preditiva baseada no histórico de telemetria
            </p>
          </div>
          <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500">
            <option>Últimos 30 dias</option>
            <option>Última semana</option>
          </select>
        </div>

        {/* Gráfico Recharts */}
        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={dataGrafico}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRisco" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorFalhas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1e293b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="falhas"
                stroke="#1e293b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorFalhas)"
              />
              <Area
                type="monotone"
                dataKey="risco"
                stroke="#f97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRisco)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda */}
        <div className="flex items-center gap-6 mt-4 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-orange-500 rounded-full"></div> Risco
            Preditivo
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-slate-800 rounded-full"></div> Falhas
            Reais
          </div>
        </div>
      </div>

      {/* ================= PAINEL 2: AGENDA AUTOMÁTICA (Ocupa 1 coluna) ================= */}
      <div className="lg:col-span-1 bg-orange-50/50 rounded-2xl shadow-sm border border-orange-100 p-6 flex flex-col h-96 overflow-y-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <h2 className="text-md font-bold text-slate-800 leading-tight">
              Agenda Automática
            </h2>
            <p className="text-xs font-semibold text-orange-600">
              Kaizen Engine Ativo
            </p>
          </div>
        </div>

        {/* Card Tarefa 1 */}
        <div className="bg-white rounded-xl p-4 border-l-4 border-red-500 shadow-sm mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-red-500">HOJE, 14:00</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-slate-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            Troca de Rolamentos Preditiva
          </h4>
          <p className="text-xs text-slate-500 mb-4 mt-1">
            Torno CNC Principal - Baseado em vibração anômala
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg transition-colors">
              Aprovar OS
            </button>
            <button className="w-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Card Tarefa 2 */}
        <div className="bg-white rounded-xl p-4 border-l-4 border-yellow-400 shadow-sm">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-yellow-600">
              AMANHÃ, 08:00
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-slate-300"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
          </div>
          <h4 className="text-sm font-bold text-slate-800">
            Lubrificação Geral (500h)
          </h4>
          <p className="text-xs text-slate-500 mb-4 mt-1">
            Ponte Rolante A - Atingiu limite de horas
          </p>
          <div className="flex gap-2">
            <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-lg transition-colors">
              Aprovar OS
            </button>
            <button className="w-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ================= PAINEL 3: ATIVOS CRÍTICOS (Ocupa 2 colunas) ================= */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            Ativos em Monitoramento Crítico
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            Ver Todos
          </a>
        </div>

        <div className="space-y-4">
          {/* Ativo 1 */}
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
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
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Torno CNC Principal - T01
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  🕒 4.520h uso &nbsp;|&nbsp; 🌡️ Temp Anormal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Risco de falha
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    {/* Animação da barra */}
                    <div
                      className="bg-red-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: animar ? "85%" : "0%" }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-red-500">85%</span>
                </div>
              </div>
              <button className="text-xs font-bold text-orange-500 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors">
                Agendar IA
              </button>
            </div>
          </div>

          {/* Separador */}
          <div className="border-b border-slate-100"></div>

          {/* Ativo 2 */}
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
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
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Compressor Parafuso - C04
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  🕒 12.100h uso &nbsp;|&nbsp; ✅ Pressão OK
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Risco de falha
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    {/* Animação da barra */}
                    <div
                      className="bg-yellow-400 h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: animar ? "42%" : "0%" }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-yellow-500">42%</span>
                </div>
              </div>
              <button className="text-xs font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 px-4 py-1.5 rounded-lg transition-colors">
                Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PAINEL 4: STATUS DO PLANO (Ocupa 1 coluna) ================= */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center relative">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest absolute top-6 left-6">
          Status do Plano Mensal
        </h3>

        {/* Gráfico de Rosca (Donut) SVG Customizado Animado */}
        <div className="relative mt-8 w-40 h-40 flex items-center justify-center">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Círculo de fundo (Pendente - Azul escuro) */}
            <circle
              cx="50"
              cy="50"
              r={raio}
              fill="transparent"
              stroke="#1e293b"
              strokeWidth="12"
            />

            {/* Círculo de progresso (Feito - Laranja) */}
            <circle
              cx="50"
              cy="50"
              r={raio}
              fill="transparent"
              stroke="#f97316"
              strokeWidth="12"
              strokeDasharray={circunferencia}
              strokeDashoffset={offsetRosca}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Texto Central */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-800">
              {porcentagemConcluida}%
            </span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">
              Concluído
            </span>
          </div>
        </div>

        {/* Legenda do Donut */}
        <div className="flex gap-4 mt-6 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Feito
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span> Pendente
          </div>
        </div>
      </div>
    </div>
  );
}
