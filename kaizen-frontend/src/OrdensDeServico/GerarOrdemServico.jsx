import { useEffect, useState } from "react";

export default function GerarOrdemServico() {
  // === ESTADOS DO FORMULÁRIO ===
  const [formData, setFormData] = useState({
    equipamento: "",
    tag: "",
    setor: "",
    tipoManutencao: "",
    solicitante: "",
    dataAbertura: "",
    descricao: "",
    relatorio: "",
    dataInicio: "",
    dataFim: "",
    assinaturaTecnico: "",
    assinaturaSupervisor: "",
  });

  const [pecas, setPecas] = useState([{ descricao: "", qtd: "", cod: "" }]);
  const [salvando, setSalvando] = useState(false);

  // === ESTADOS DO AUTOCOMPLETE DE EQUIPAMENTOS ===
  const [listaEquipamentos, setListaEquipamentos] = useState([]);
  const [equipamentosFiltrados, setEquipamentosFiltrados] = useState([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

  // 1. Busca os equipamentos do banco assim que a tela carrega
  useEffect(() => {
    // IMPORTANTE: Verifique se a sua rota é /equipamentos ou /api/equipamentos
    fetch("http://localhost:8080/equipamentos")
      .then((res) => res.json())
      .then((data) => setListaEquipamentos(data))
      .catch((err) => console.error("Erro ao buscar equipamentos:", err));
  }, []);

  // 2. Lida com a digitação no campo de Equipamento
  const handleBuscaEquipamento = (e) => {
    const valorDigitado = e.target.value;

    // Atualiza o texto que o usuário está vendo
    setFormData((prev) => ({ ...prev, equipamento: valorDigitado }));

    // Se apagou o texto, limpa o equipamento selecionado
    if (valorDigitado === "") {
      setEquipamentoSelecionado(null);
      setFormData((prev) => ({ ...prev, tag: "", setor: "" }));
      setMostrarDropdown(false);
      return;
    }

    // Filtra a lista comparando o que foi digitado com o Nome OU com a TAG
    const filtrados = listaEquipamentos.filter((eq) => {
      const nome = eq.nome ? eq.nome.toLowerCase() : "";
      const tag = eq.tag ? eq.tag.toLowerCase() : "";
      const busca = valorDigitado.toLowerCase();
      return nome.includes(busca) || tag.includes(busca);
    });

    setEquipamentosFiltrados(filtrados);
    setMostrarDropdown(true);
  };

  // 3. Quando o usuário clica na opção do dropdown
  const selecionarEquipamento = (eq) => {
    setEquipamentoSelecionado(eq); // Guarda o ID verdadeiro aqui!
    setFormData((prev) => ({
      ...prev,
      equipamento: eq.nome,
      tag: eq.tag,
      setor: `${eq.local} - ${eq.localInstalacao}`, // Junta o local e a instalação
    }));
    setMostrarDropdown(false);
  };

  // Atualiza os outros campos normais
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Funções de peças
  const addPeca = () =>
    setPecas([...pecas, { descricao: "", qtd: "", cod: "" }]);
  const removePeca = (index) => {
    if (pecas.length > 1) setPecas(pecas.filter((_, i) => i !== index));
  };
  const updatePeca = (index, campo, valor) => {
    const newList = [...pecas];
    newList[index][campo] = valor;
    setPecas(newList);
  };

  // Monta o pacote para o Java (agora com o ID do equipamento dinâmico!)
  const montarPayloadParaJava = () => {
    return {
      numeroOs:
        "OS-" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0"),

      // MÁGICA AQUI: Pega o ID real do equipamento que o usuário clicou no autocomplete
      equipamento: equipamentoSelecionado
        ? { id: equipamentoSelecionado.id }
        : null,

      // Mantendo fixo por enquanto, no futuro faremos autocomplete para Técnicos também
      userLow: { id: 1 },
      userMedium: { id: 2 },

      tipoManutencao: formData.tipoManutencao || "CORRETIVA",
      solicitante: formData.solicitante,

      dataAbertura: formData.dataAbertura
        ? `${formData.dataAbertura}T00:00:00`
        : null,
      descricaoSolicitacao: formData.descricao,
      relatorioTecnico: formData.relatorio,
      dataHoraInicio: formData.dataInicio || null,
      dataHoraFim: formData.dataFim || null,
    };
  };

  // Apenas Salva no Banco
  const handleSalvar = async (e) => {
    e.preventDefault();
    if (!equipamentoSelecionado) {
      alert("Por favor, selecione um equipamento válido da lista.");
      return;
    }
    setSalvando(true);
    const payload = montarPayloadParaJava();

    try {
      const response = await fetch("http://localhost:8080/api/ordens-servico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Ordem de Serviço salva com sucesso no banco!");
      } else {
        alert("Erro ao salvar a OS. Verifique o console do Spring Boot.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setSalvando(false);
    }
  };

  // Salva no Banco e devolve o PDF
  const handleSalvarEImprimir = async (e) => {
    e.preventDefault();
    if (!equipamentoSelecionado) {
      alert("Por favor, selecione um equipamento válido da lista.");
      return;
    }
    setSalvando(true);
    const payload = montarPayloadParaJava();

    try {
      const response = await fetch(
        "http://localhost:8080/api/ordens-servico/gerar-pdf",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("Erro ao gerar o PDF no servidor Java.");
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto w-full animate-fade-in print:p-0 print:m-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 print:border-none print:shadow-none print:p-0">
        <div className="text-center mb-10 print:mb-6 border-b border-slate-200 pb-6 print:pb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            KAIZEN
          </h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mt-1 mb-4">
            Gestão de Manutenção
          </p>
          <h2 className="text-2xl font-bold text-blue-600">ORDEM DE SERVIÇO</h2>
        </div>

        <form className="space-y-8 print:space-y-4">
          {/* Sessão 1: Equipamento com Autocomplete */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full print:hidden"></span>
              1. Identificação do Equipamento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* CAMPO COM AUTOCOMPLETE */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                  Buscar Equipamento / TAG
                </label>
                <input
                  type="text"
                  name="equipamento"
                  value={formData.equipamento}
                  onChange={handleBuscaEquipamento}
                  autoComplete="off"
                  className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                  placeholder="Digite nome ou TAG..."
                />

                {/* MENU FLUTUANTE (DROPDOWN) */}
                {mostrarDropdown && equipamentosFiltrados.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto print:hidden">
                    {equipamentosFiltrados.map((eq) => (
                      <li
                        key={eq.id}
                        onClick={() => selecionarEquipamento(eq)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-none transition-colors"
                      >
                        <div className="font-bold text-slate-800 text-sm">
                          {eq.tag}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {eq.nome} • {eq.local}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Se não achou nada */}
                {mostrarDropdown &&
                  formData.equipamento.length > 0 &&
                  equipamentosFiltrados.length === 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-sm text-slate-500 text-center print:hidden">
                      Nenhum equipamento encontrado.
                    </div>
                  )}
              </div>

              {/* Campos preenchidos automaticamente (Read-Only) */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                  TAG / Código
                </label>
                <input
                  readOnly
                  name="tag"
                  value={formData.tag}
                  className="w-full bg-slate-100/50 text-slate-600 text-sm border border-slate-200 rounded-lg px-4 py-2.5 cursor-not-allowed print:border-b print:border-slate-300 print:rounded-none print:px-0 print:bg-transparent"
                  placeholder="Auto-preenchido"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                  Setor
                </label>
                <input
                  readOnly
                  name="setor"
                  value={formData.setor}
                  className="w-full bg-slate-100/50 text-slate-600 text-sm border border-slate-200 rounded-lg px-4 py-2.5 cursor-not-allowed print:border-b print:border-slate-300 print:rounded-none print:px-0 print:bg-transparent"
                  placeholder="Auto-preenchido"
                />
              </div>
            </div>
          </div>

          {/* O RESTO DO FORMULÁRIO CONTINUA IGUAL... */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full print:hidden"></span>
              2. Detalhes da Solicitação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                  Tipo de Manutenção
                </label>
                <select
                  name="tipoManutencao"
                  value={formData.tipoManutencao}
                  onChange={handleChange}
                  className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all print:appearance-none print:border-b print:border-slate-300 print:rounded-none print:px-0"
                >
                  <option value="">Selecione...</option>
                  <option value="PREVENTIVA">Preventiva</option>
                  <option value="CORRETIVA">Corretiva</option>
                  <option value="PREDITIVA">Preditiva</option>
                  <option value="INSPECAO">Inspeção</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                  Solicitante
                </label>
                <input
                  name="solicitante"
                  value={formData.solicitante}
                  onChange={handleChange}
                  className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                  placeholder="Nome do solicitante"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                  Data de Abertura
                </label>
                <input
                  type="date"
                  name="dataAbertura"
                  value={formData.dataAbertura}
                  onChange={handleChange}
                  className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                Descrição do Problema / Atividade
              </label>
              <input
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                placeholder="Descreva o que precisa ser feito..."
              />
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full print:hidden"></span>
              3. Relatório Técnico
            </h3>
            <textarea
              name="relatorio"
              value={formData.relatorio}
              onChange={handleChange}
              rows="4"
              className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none print:border print:border-slate-300"
              placeholder="Descreva em detalhes o serviço realizado, causas raiz e soluções aplicadas..."
            ></textarea>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full print:hidden"></span>
              4. Materiais e Peças Utilizados
            </h3>

            <div className="grid grid-cols-12 gap-3 mb-2 px-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-7">Descrição da Peça</div>
              <div className="col-span-2">Qtd</div>
              <div className="col-span-2">Código</div>
              <div className="col-span-1 print:hidden"></div>
            </div>

            <div className="space-y-2">
              {pecas.map((peca, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-7">
                    <input
                      value={peca.descricao}
                      onChange={(e) =>
                        updatePeca(index, "descricao", e.target.value)
                      }
                      className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                      placeholder="Material ou peça"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={peca.qtd}
                      onChange={(e) => updatePeca(index, "qtd", e.target.value)}
                      className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                      placeholder="0"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      value={peca.cod}
                      onChange={(e) => updatePeca(index, "cod", e.target.value)}
                      className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-all print:border-b print:border-slate-300 print:rounded-none print:px-0"
                      placeholder="Cód"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center print:hidden">
                    {pecas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePeca(index)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPeca}
              className="mt-4 text-sm text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-1.5 print:hidden"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Adicionar Linha
            </button>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full print:hidden"></span>
              5. Finalização e Assinaturas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                    Data/Hora Início
                  </label>
                  <input
                    type="datetime-local"
                    name="dataInicio"
                    value={formData.dataInicio}
                    onChange={handleChange}
                    className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 print:border-b print:border-slate-300 print:rounded-none print:px-0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                    Assinatura do Técnico
                  </label>
                  <input
                    name="assinaturaTecnico"
                    value={formData.assinaturaTecnico}
                    onChange={handleChange}
                    className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 print:border-b print:border-slate-300 print:rounded-none print:px-0"
                    placeholder="Nome completo"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                    Data/Hora Fim
                  </label>
                  <input
                    type="datetime-local"
                    name="dataFim"
                    value={formData.dataFim}
                    onChange={handleChange}
                    className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 print:border-b print:border-slate-300 print:rounded-none print:px-0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">
                    Assinatura do Supervisor
                  </label>
                  <input
                    name="assinaturaSupervisor"
                    value={formData.assinaturaSupervisor}
                    onChange={handleChange}
                    className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 print:border-b print:border-slate-300 print:rounded-none print:px-0"
                    placeholder="Nome completo"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-end gap-3 print:hidden">
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className={`bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 ${salvando ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Salvar OS
            </button>
            <button
              onClick={handleSalvarEImprimir}
              disabled={salvando}
              className={`font-bold py-2.5 px-8 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 ${salvando ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Salvar e Gerar PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
