import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import Sidebar from "./SideBarMain/sideBar";

export default function App() {
  // === ESTADOS ===
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [termoBusca, setTermoBusca] = useState("");
  const [equipamentos, setEquipamentos] = useState([]);

  // === ESTADOS DE PAGINAÇÃO ===
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;

  // === ESTADOS DO FORMULÁRIO ===
  const [local, setLocal] = useState("");
  const [localInstalacao, setLocalInstalacao] = useState("");
  const [tag, setTag] = useState("");
  const [nome, setNome] = useState("");
  const [criticidade, setCriticidade] = useState("");
  const [plano, setPlano] = useState("");
  const [dias, setDias] = useState("");

  // === BUSCA OS DADOS DA API ===
  useEffect(() => {
    fetch("http://localhost:8080/equipamentos")
      .then((response) => response.json())
      .then((data) => setEquipamentos(data))
      .catch((error) => console.error("Erro ao buscar as máquinas:", error));
  }, []);

  const salvarEquipamento = (e) => {
    e.preventDefault();
    const novaMaquina = {
      local,
      localInstalacao,
      nome,
      tag,
      criticidade,
      plano,
      diasProximaPreventiva: parseInt(dias),
    };

    fetch("http://localhost:8080/equipamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaMaquina),
    })
      .then((response) => response.json())
      .then((data) => {
        setEquipamentos([...equipamentos, data]);
        setLocal("");
        setLocalInstalacao("");
        setNome("");
        setTag("");
        setCriticidade("");
        setPlano("");
        setDias("");
        setMostrarFormulario(false);
      })
      .catch((error) => console.error("Erro ao salvar:", error));
  };

  const getStatusBadge = (status) => {
    const statusReal = status || "Operacional";
    switch (statusReal) {
      case "Operacional":
        return (
          <span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>{" "}
            Operacional
          </span>
        );
      case "Em Manutenção":
        return (
          <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>{" "}
            Em Manutenção
          </span>
        );
      case "Requer Atenção":
        return (
          <span className="bg-yellow-50 text-yellow-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>{" "}
            Requer Atenção
          </span>
        );
      default:
        return null;
    }
  };

  // === LÓGICA DE FILTRO E PAGINAÇÃO ===
  const equipamentosFiltrados = equipamentos.filter((eq) => {
    const atendeBusca =
      eq.nome?.toLowerCase().includes(termoBusca.toLowerCase()) ||
      eq.tag?.toLowerCase().includes(termoBusca.toLowerCase());
    const atendeStatus = filtroStatus === "Todos" || eq.status === filtroStatus;
    return atendeBusca && atendeStatus;
  });

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const equipamentosAtuais = equipamentosFiltrados.slice(
    indicePrimeiroItem,
    indiceUltimoItem,
  );
  const totalPaginas = Math.ceil(equipamentosFiltrados.length / itensPorPagina);

  const irParaPagina = (numero) => {
    if (numero >= 1 && numero <= totalPaginas) {
      setPaginaAtual(numero);
      // Agora ele busca a tag <main> do seu Layout.jsx e rola ela pro topo
      document.querySelector("main").scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // === RENDERIZAÇÃO DA TELA DE DETALHES (Visão 2) ===
  if (equipamentoSelecionado) {
    const eq = equipamentoSelecionado;
    return (
      // MUDANÇA AQUI: Trava a tela inteira (h-screen overflow-hidden)
      <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
        {Sidebar}

        {/* MUDANÇA AQUI: Só o conteúdo interno rola (overflow-y-auto) */}
        <div id="area-scroll" className="flex-1 h-full overflow-y-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto animate-fade-in">
            <button
              onClick={() => setEquipamentoSelecionado(null)}
              className="flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6"
            >
              <svg
                className="w-4 h-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Voltar para Equipamentos
            </button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    {eq.nome || eq.tag}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {eq.local} • {eq.localInstalacao}
                  </p>
                  <div className="mt-2">{getStatusBadge(eq.status)}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Horas de Uso
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {eq.horasUso || 0}h
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Falhas
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {eq.falhas || 0}
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Disponibilidade
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {eq.disponibilidade || "100"}%
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Manutenções
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {eq.manutencoesAno || 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-6">
                  Histórico de Falhas
                </h3>
                <div className="h-48 w-full">
                  {eq.historicoFalhas && eq.historicoFalhas.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={eq.historicoFalhas}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#f1f5f9"
                        />
                        <XAxis
                          dataKey="mes"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#94a3b8" }}
                          dy={10}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="falhas"
                          stroke="#ef4444"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-sm">
                      Sem dados registrados no momento.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-6">
                  Informações Técnicas
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500">TAG</span>
                    <span className="font-semibold text-slate-800">
                      {eq.tag}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Criticidade</span>
                    <span className="font-semibold text-slate-800">
                      {eq.criticidade}
                    </span>
                  </li>
                  <li className="flex justify-between border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Plano</span>
                    <span className="font-semibold text-slate-800">
                      {eq.plano}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-500">Preventiva (Dias)</span>
                    <span className="font-semibold text-blue-600">
                      Em {eq.diasProximaPreventiva} dias
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RENDERIZAÇÃO DA LISTA DE CARDS (Visão 1) ===
  return (
    // MUDANÇA AQUI TAMBÉM
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {Sidebar}

      {/* MUDANÇA AQUI: Área que permite o scroll independente */}
      <div id="area-scroll" className="flex-1 h-full overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Equipamentos
              </h1>
              <p className="text-sm text-slate-500 font-medium">
                {equipamentosFiltrados.length} equipamentos encontrados
              </p>
            </div>
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {mostrarFormulario ? "✕ Cancelar" : "+ Novo Equipamento"}
            </button>
          </div>

          {/* Barra de Busca e Filtro */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar equipamentos..."
                className="w-full bg-transparent border-none text-slate-700 text-sm pl-10 pr-4 py-2 focus:ring-0 outline-none"
                value={termoBusca}
                onChange={(e) => {
                  setTermoBusca(e.target.value);
                  setPaginaAtual(1); // Reseta a paginação ao buscar
                }}
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-1"></div>
            <div className="flex items-center gap-2 px-2">
              <svg
                className="w-5 h-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              <select
                className="bg-transparent border-none text-slate-700 text-sm font-semibold focus:ring-0 outline-none cursor-pointer py-2 pr-8"
                value={filtroStatus}
                onChange={(e) => {
                  setFiltroStatus(e.target.value);
                  setPaginaAtual(1); // Reseta a paginação ao filtrar
                }}
              >
                <option value="Todos">Todos os Status</option>
                <option value="Operacional">Operacional</option>
                <option value="Em Manutenção">Em Manutenção</option>
                <option value="Requer Atenção">Requer Atenção</option>
              </select>
            </div>
          </div>

          {/* Formulário ... */}
          {mostrarFormulario && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 animate-fade-in">
              <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">
                Cadastrar Novo Equipamento
              </h3>
              <form onSubmit={salvarEquipamento} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Local
                    </label>
                    <input
                      type="text"
                      value={local}
                      onChange={(e) => setLocal(e.target.value)}
                      required
                      placeholder="Ex: RECEBIMENTO 1"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Instalação
                    </label>
                    <input
                      type="text"
                      value={localInstalacao}
                      onChange={(e) => setLocalInstalacao(e.target.value)}
                      required
                      placeholder="Ex: 1000-1118-10-05"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      TAG
                    </label>
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      required
                      placeholder="Ex: TC-1"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  <div className="md:col-span-6">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Nome do Equipamento
                    </label>
                    <input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      placeholder="Ex: Bomba"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Criticidade
                    </label>
                    <input
                      type="text"
                      value={criticidade}
                      onChange={(e) => setCriticidade(e.target.value)}
                      required
                      placeholder="Ex: B"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Plano
                    </label>
                    <input
                      type="text"
                      value={plano}
                      onChange={(e) => setPlano(e.target.value)}
                      required
                      placeholder="Ex: PREV-MEC"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Dias Prev.
                    </label>
                    <input
                      type="number"
                      value={dias}
                      onChange={(e) => setDias(e.target.value)}
                      required
                      placeholder="Ex: 30"
                      className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-lg shadow-sm transition-all"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* GRID DOS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {equipamentosAtuais.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-500">
                Nenhum equipamento cadastrado ou carregando...
              </div>
            ) : (
              equipamentosAtuais.map((eq) => (
                <div
                  key={eq.id}
                  onClick={() => setEquipamentoSelecionado(eq)}
                  className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    {getStatusBadge(eq.status)}
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-extrabold text-slate-800 truncate">
                      {eq.nome || eq.tag}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {eq.local} • {eq.localInstalacao}
                    </p>
                  </div>

                  <div className="border-t border-slate-50 my-4"></div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Criticidade</span>
                      <span className="font-bold text-slate-800">
                        {eq.criticidade || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Próx. Preventiva</span>
                      <span className="font-bold text-slate-800">
                        {eq.diasProximaPreventiva
                          ? `Em ${eq.diasProximaPreventiva} dias`
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* CONTROLES DE PAGINAÇÃO */}
          {totalPaginas > 1 && (
            <div className="flex justify-center mt-6 pb-6">
              <nav aria-label="Navegação de equipamentos">
                <ul className="flex items-center -space-x-px h-10 text-sm">
                  <li>
                    <button
                      onClick={() => irParaPagina(paginaAtual - 1)}
                      disabled={paginaAtual === 1}
                      className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 border-slate-200 rounded-s-xl transition-colors ${paginaAtual === 1 ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                    >
                      <span className="sr-only">Anterior</span>
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15 19-7-7 7-7"
                        />
                      </svg>
                    </button>
                  </li>

                  {[...Array(totalPaginas)].map((_, i) => {
                    const numPagina = i + 1;
                    if (
                      numPagina === 1 ||
                      numPagina === totalPaginas ||
                      (numPagina >= paginaAtual - 1 &&
                        numPagina <= paginaAtual + 1)
                    ) {
                      return (
                        <li key={numPagina}>
                          <button
                            onClick={() => irParaPagina(numPagina)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight transition-colors ${paginaAtual === numPagina ? "z-10 text-orange-600 border border-orange-300 bg-orange-50 font-bold" : "text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-700"}`}
                          >
                            {numPagina}
                          </button>
                        </li>
                      );
                    } else if (
                      numPagina === paginaAtual - 2 ||
                      numPagina === paginaAtual + 2
                    ) {
                      return (
                        <li
                          key={numPagina}
                          className="px-3 h-10 flex items-center bg-white border border-slate-200 text-slate-400"
                        >
                          ...
                        </li>
                      );
                    }
                    return null;
                  })}

                  <li>
                    <button
                      onClick={() => irParaPagina(paginaAtual + 1)}
                      disabled={paginaAtual === totalPaginas}
                      className={`flex items-center justify-center px-4 h-10 leading-tight border border-slate-200 rounded-e-xl transition-colors ${paginaAtual === totalPaginas ? "bg-slate-50 text-slate-300 cursor-not-allowed" : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}
                    >
                      <span className="sr-only">Próximo</span>
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
