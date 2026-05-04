import { useEffect, useState } from "react";
import Sidebar from "./SideBarMain/sideBar";

function App() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [local, setLocal] = useState("");
  const [localInstalacao, setLocalInstalacao] = useState("");
  const [tag, setTag] = useState("");
  const [nome, setNome] = useState("");
  const [criticidade, setCriticidade] = useState("");
  const [plano, setPlano] = useState("");
  const [dias, setDias] = useState("");

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

  // Lógica ninja para cores dinâmicas igual sua referência
  const getCorEquipamento = (tagText) => {
    if (tagText && tagText.toUpperCase().includes("TC")) {
      return {
        border: "border-blue-500",
        bgIcon: "bg-blue-50",
        textIcon: "text-blue-600",
      };
    }
    return {
      border: "border-purple-500",
      bgIcon: "bg-purple-50",
      textIcon: "text-purple-600",
    };
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-800">
      {Sidebar}

      <div className="flex-1 p-8 max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Controle de Equipamentos
          </h1>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2"
          >
            {mostrarFormulario ? (
              <>
                <span>✕</span> Cancelar
              </>
            ) : (
              <>
                <span className="text-xl leading-none mb-1">+</span> Novo
                Equipamento
              </>
            )}
          </button>
        </div>

        {/* Formulário Retrátil */}
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
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    placeholder="Ex: TRANSPORTADOR DE CORRENTE"
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
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
                    placeholder="Ex: 180"
                    className="w-full bg-slate-50 text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-8 rounded-lg shadow-sm transition-all"
                >
                  Salvar Equipamento
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabela Fake (Lista de Cards) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2">
          {/* Cabeçalho das Colunas (Escondido no celular, visível no PC) */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-2">
            <div className="col-span-3">Equipamento</div>
            <div className="col-span-2">Local</div>
            <div className="col-span-2">Instalação</div>
            <div className="col-span-2">Plano</div>
            <div className="col-span-2">Próx. Preventiva</div>
            <div className="col-span-1 text-center">Crítica</div>
          </div>

          {equipamentos.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              Nenhum equipamento cadastrado.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {equipamentos.map((maquina) => {
                const cores = getCorEquipamento(maquina.tag);

                return (
                  <div
                    key={maquina.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white p-3 rounded-xl border border-slate-100 border-l-4 ${cores.border} hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default`}
                  >
                    {/* Coluna 1: Equipamento */}
                    <div className="col-span-3 flex items-center gap-4 pl-2">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${cores.bgIcon} ${cores.textIcon}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">
                          {maquina.tag}
                        </div>
                        <div className="text-[11px] font-medium text-slate-400 uppercase truncate max-w-[180px]">
                          {maquina.nome}
                        </div>
                      </div>
                    </div>

                    {/* Coluna 2: Local */}
                    <div className="col-span-2 flex items-center gap-2 text-sm text-slate-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-slate-400"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="truncate">{maquina.local}</span>
                    </div>

                    {/* Coluna 3: Instalação */}
                    <div className="col-span-2 flex items-center gap-2 text-sm text-slate-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-slate-400"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="truncate">
                        {maquina.localInstalacao}
                      </span>
                    </div>

                    {/* Coluna 4: Plano */}
                    <div className="col-span-2 flex items-center gap-2 text-sm text-slate-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-slate-400"
                      >
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                      <span className="truncate">{maquina.plano}</span>
                    </div>

                    {/* Coluna 5: Próx Preventiva (Ponto Focal) */}
                    <div className="col-span-2 flex items-center gap-2 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 text-orange-500"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="text-orange-600 font-semibold tracking-tight">
                        Em {maquina.diasProximaPreventiva} dias
                      </span>
                    </div>

                    {/* Coluna 6: Criticidade */}
                    <div className="col-span-1 flex justify-center">
                      <span className="bg-orange-50 text-orange-600 font-bold text-xs px-3 py-1.5 rounded-md">
                        {maquina.criticidade}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
