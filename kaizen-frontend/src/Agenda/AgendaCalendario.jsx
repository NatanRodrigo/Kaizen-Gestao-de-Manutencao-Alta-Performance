import { useState } from "react";

export default function AgendaCalendario() {
  // Agora o estado guarda o EVENTO específico que foi clicado, e não mais o dia
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  // Adicionei uma 'descricao' nos dados para preencher o lado direito do seu novo Modal
  const diasDoMes = [
    { id: "v1", vazio: true },
    { id: "v2", vazio: true },
    { id: "v3", vazio: true },
    { id: "v4", vazio: true },
    { id: "v5", vazio: true },
    {
      dia: 1,
      eventos: [
        {
          id: 1,
          hora: "14:00",
          tipo: "concluida",
          titulo: "Lubrificação Geral",
          equipamento: "Ponte Rolante A",
          tecnico: "Lucilei",
          descricao:
            "Realizar a lubrificação completa dos cabos de aço e engrenagens principais conforme plano de 500h. Verificar também o estado das roldanas.",
        },
      ],
    },
    {
      dia: 2,
      eventos: [
        {
          id: 2,
          hora: "10:30",
          tipo: "preventiva",
          titulo: "Troca de Filtros",
          equipamento: "Compressor C04",
          tecnico: "Ronei",
          descricao:
            "Substituição dos filtros de ar e separadores de óleo. Checar nível de óleo sintético.",
        },
        {
          id: 3,
          hora: "15:00",
          tipo: "urgente",
          titulo: "Falha no Motor",
          equipamento: "Esteira 02",
          tecnico: "Marcelo",
          descricao:
            "Motor desarmando por sobrecarga. Necessário medir isolamento e verificar possível travamento mecânico na esteira.",
        },
      ],
    },
    { dia: 3, eventos: [] },
    { dia: 4, eventos: [], hoje: true },
    {
      dia: 5,
      eventos: [
        {
          id: 4,
          hora: "08:00",
          tipo: "preventiva",
          titulo: "Inspeção Termográfica",
          equipamento: "Painel Principal",
          tecnico: "Jin-Woo",
          descricao:
            "Varredura térmica em todos os disjuntores e contatores do painel principal para identificar pontos quentes antes do verão.",
        },
      ],
    },
    { dia: 6, eventos: [] },
    { dia: 7, eventos: [] },
    {
      dia: 8,
      eventos: [
        {
          id: 5,
          hora: "11:00",
          tipo: "concluida",
          titulo: "Calibração",
          equipamento: "Balança 01",
          tecnico: "Ronei",
          descricao:
            "Calibração de rotina com pesos padrão rastreados. Emissão de certificado atualizado.",
        },
      ],
    },
    { dia: 9, eventos: [] },
    { dia: 10, eventos: [] },
    { dia: 11, eventos: [] },
    {
      dia: 12,
      eventos: [
        {
          id: 6,
          hora: "13:30",
          tipo: "preventiva",
          titulo: "Troca de Óleo",
          equipamento: "Torno CNC",
          tecnico: "Marcelo",
          descricao:
            "Drenar óleo do sistema hidráulico, limpar reservatório e abastecer com fluido novo (ISO 68).",
        },
      ],
    },
    { dia: 13, eventos: [] },
    { dia: 14, eventos: [] },
    {
      dia: 15,
      eventos: [
        {
          id: 7,
          hora: "09:00",
          tipo: "preventiva",
          titulo: "Reaperto Geral",
          equipamento: "Elevador de Canecas",
          tecnico: "Lucilei",
          descricao:
            "Reaperto de todos os parafusos de fixação das canecas na correia. Verificar desgaste das emendas.",
        },
      ],
    },
    { dia: 16, eventos: [] },
    { dia: 17, eventos: [] },
    {
      dia: 18,
      eventos: [
        {
          id: 8,
          hora: "16:00",
          tipo: "urgente",
          titulo: "Vazamento Hidráulico",
          equipamento: "Prensa 400T",
          tecnico: "Jin-Woo",
          descricao:
            "Operador relatou perda de pressão e poça de óleo sob o cilindro principal. Isolar área e trocar reparos.",
        },
      ],
    },
    { dia: 19, eventos: [] },
    { dia: 20, eventos: [] },
    { dia: 21, eventos: [] },
    {
      dia: 22,
      eventos: [
        {
          id: 9,
          hora: "10:00",
          tipo: "concluida",
          titulo: "Limpeza de Dutos",
          equipamento: "Exaustor Central",
          tecnico: "Ronei",
          descricao:
            "Limpeza física dos dutos principais para garantir vazão nominal e evitar acúmulo de particulados.",
        },
      ],
    },
    { dia: 23, eventos: [] },
    { dia: 24, eventos: [] },
    { dia: 25, eventos: [] },
    { dia: 26, eventos: [] },
    { dia: 27, eventos: [] },
    { dia: 28, eventos: [] },
    { dia: 29, eventos: [] },
    {
      dia: 30,
      eventos: [
        {
          id: 10,
          hora: "09:00",
          tipo: "preventiva",
          titulo: "Aferição de Sensores",
          equipamento: "Robô de Solda",
          tecnico: "Marcelo",
          descricao:
            "Limpeza das lentes e aferição de distância dos sensores de presença na célula de solda robotizada.",
        },
      ],
    },
    { dia: 31, eventos: [] },
  ];

  // Cores das etiquetas no calendário
  const getCorEvento = (tipo) => {
    switch (tipo) {
      case "preventiva":
        return "bg-blue-600 text-white hover:bg-blue-700";
      case "urgente":
        return "bg-red-600 text-white hover:bg-red-700";
      case "concluida":
        return "bg-emerald-500 text-white hover:bg-emerald-600";
      default:
        return "bg-slate-500 text-white";
    }
  };

  // Cores dos textos de status no Modal
  const getStatusTextCor = (tipo) => {
    switch (tipo) {
      case "preventiva":
        return "text-blue-600";
      case "urgente":
        return "text-red-600";
      case "concluida":
        return "text-emerald-600";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen flex flex-col gap-6 w-full relative">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Calendário de Manutenções
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Manutenções agendadas automaticamente pelo sistema
        </p>
      </div>

      {/* Container do Calendário */}
      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl w-full p-6">
        {/* Controles do Mês */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-800">
            Maio <span className="font-medium text-slate-500">2026</span>
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button className="px-4 h-10 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Hoje
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid do Calendário */}
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-7 mb-2">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                (dia, index) => (
                  <div
                    key={index}
                    className="text-center text-sm font-bold text-slate-400 uppercase tracking-wider pb-2"
                  >
                    {dia}
                  </div>
                ),
              )}
            </div>

            <div className="grid grid-cols-7 gap-3">
              {diasDoMes.map((item, index) => {
                if (item.vazio)
                  return (
                    <div
                      key={`vazio-${index}`}
                      className="min-h-[120px] rounded-xl border border-slate-100 bg-slate-50/50"
                    ></div>
                  );

                return (
                  <div
                    key={`dia-${item.dia}`}
                    className={`min-h-[120px] rounded-xl border p-2 flex flex-col transition-all ${item.hoje ? "border-blue-400 bg-blue-50/30 shadow-sm ring-1 ring-blue-400" : "border-slate-100"}`}
                  >
                    <span
                      className={`text-sm font-bold mb-2 ml-1 ${item.hoje ? "text-blue-600" : "text-slate-700"}`}
                    >
                      {item.dia}
                    </span>

                    {/* Lista de Eventos (Pílulas) */}
                    <div className="flex flex-col gap-1.5 overflow-y-auto">
                      {item.eventos &&
                        item.eventos.map((evento) => (
                          <button
                            key={evento.id}
                            // O CLICK AGORA É AQUI: Abre o Modal apenas com o evento específico
                            onClick={() =>
                              setEventoSelecionado({
                                ...evento,
                                diaMascara: `${item.dia} de Maio, 2026`,
                              })
                            }
                            className={`flex items-center gap-1.5 text-left text-xs font-semibold px-2 py-1.5 rounded-md truncate transition-colors shadow-sm ${getCorEvento(evento.tipo)}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 flex-shrink-0"></span>
                            <span className="truncate">{evento.titulo}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL DE DETALHES (Estilo do seu Print) ================= */}
      {eventoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Fundo escuro desfocado (Backdrop) */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setEventoSelecionado(null)} // Clica fora pra fechar
          ></div>

          {/* Caixa do Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col animate-fade-in-up">
            {/* Header do Modal */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                {eventoSelecionado.titulo}
              </h2>
              <button
                onClick={() => setEventoSelecionado(null)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
              >
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Corpo do Modal (Grid de 2 colunas igual sua referência) */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-6 bg-white">
              {/* Coluna Esquerda: Bloco de Informações Rápidas */}
              <div className="md:col-span-2 bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-5">
                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-slate-400 mt-0.5"
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
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {eventoSelecionado.diaMascara}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {eventoSelecionado.hora}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-slate-400 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Equipamento
                    </p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                      {eventoSelecionado.equipamento}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-slate-400 mt-0.5"
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
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Técnico Responsável
                    </p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                      {eventoSelecionado.tecnico}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-slate-400 mt-0.5"
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
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Status / Tipo
                    </p>
                    <p
                      className={`text-sm font-bold uppercase mt-0.5 ${getStatusTextCor(eventoSelecionado.tipo)}`}
                    >
                      {eventoSelecionado.tipo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Detalhes da Manutenção */}
              <div className="md:col-span-3 pt-2">
                <h3 className="text-base font-extrabold text-slate-800 mb-3">
                  Detalhes do Serviço
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {eventoSelecionado.descricao}
                </p>
              </div>
            </div>

            {/* Footer do Modal (Botões de Ação) */}
            <div className="flex justify-between items-center p-6 border-t border-slate-100 bg-slate-50">
              <div className="flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
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
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                  Editar OS
                </button>
                <button className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-sm">
                  Abrir Completa
                </button>
              </div>

              <button className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                Cancelar OS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
