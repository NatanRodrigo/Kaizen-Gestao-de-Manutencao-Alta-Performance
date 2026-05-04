import { useState } from "react";

export default function GerarOrdemServico() {
  // Função guarda a lista da peças. começa vazio
  const [pecas, setPecas] = useState([{ descricao: "", qtd: "", cod: "" }]);

  // Função adiciona nova linha para add mais peças
  const addPeca = () => {
    setPecas([...pecas, { descricao: "", qtd: "", cod: "" }]);
  };

  // Função para remover a linha mas só é possivel se tiver mais de uma
  const removePeca = (index) => {
    if (pecas.length > 1) {
      const newList = pecas.filter((_, i) => i !== index);
      setPecas(newList);
    }
  };

  // Função atualiza o  valor digitado no input da tabela
  const upadatePeca = (index, campo, valor) => {
    const newList = [...pecas];
    newList[index][campo] = valor;
    setPecas(newList);
  };

  // Função para quando clicar em imprimir
  const handleImprimir = () => {
    window.print();
  };

  // Formulario OS
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8 print:absolute print:top-0 print:left-0 print:w-full print:max-w-none print:m-0 print:p-0 print:shadow-none">
      {/*Cabeçalho*/}
      <div className="text-center mb-8 print:mb-2 border-b pb-4 print:pb-2">
        <h1 className="text-2xl font-bold text-slate-800">
          KAIZEN - Melhoria Continua
        </h1>
        <h2 className="text-xl font-semibold text-blue-600 mt-2">
          ORDEM DE SERVIÇO
        </h2>
        <h2 className="text-lg font-bold text-blue-600 mt-1">N° 007</h2>
      </div>

      <div className="space-y-6 print:space-y-2">
        {/*Identificação equipamento*/}
        <div className="bg-slate-50 p-4 print:p-2 rounded-md border border-slate-100 print:border-none print:bg-white">
          <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">
            Equipamento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Equipamento
              </label>
              <input
                className="w-full bg-white placehold:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                placeholder="Digite o nome do equipamento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                TAG/Cód
              </label>
              <input
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                placeholder="Tag do Equipamento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Localização/Setor
              </label>
              <input
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                placeholder="Setor do equipamento"
              />
            </div>
          </div>

          {/*Detalhes solicitação*/}

          <div className="bg-slate-50 p-4 print:p-2 rounded-md border border-slate-100 print:border-none print:bg-white">
            <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">
              DETALHES DA SOLICITAÇÃO
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tipo
                </label>
                <input
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate400 shadow-sm"
                  placeholder="Ex: Manutenção Corretiva"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Solicitante
                </label>
                <input
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate400 shadow-sm"
                  placeholder="Nome solicitante ex: Natan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Data Abertura
                </label>
                <input
                  type="date"
                  className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate400 shadow-sm"
                />
              </div>
            </div>

            {/*Descrição Atividade*/}
            <div className="">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Descrição
              </label>
              <input
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                placeholder="Digite a descrição da atividade"
              />
            </div>
          </div>

          {/*Relatorio tecnico*/}
          <div className="bg-slate-50 p-4 print:p-2 rounded-md border border-slate-100 print:border-none print:bg-white">
            <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-20 pb-2">
              RELATÓRIO TÉCNICO DA ATIVIDADE
            </h3>
            <textarea
              rows="5"
              className="w-full bg-whithe placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
              placeholder="Descreva em detalhes o serviço realizado..."
            ></textarea>
          </div>

          {/*Materiais e peças*/}
          <div className="bg-slate-50 p-4 rounded-md border border-slate-100 print:border-none print:bg-white print:p-0">
            <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">
              4. MATERIAIS E PEÇAS UTILIZADOS
            </h3>

            {/* Cabeçalho da tabela com print:grid-cols-12 */}
            <div className="grid grid-cols-12 print:grid-cols-12 gap-2 mb-1 px-1">
              <div className="col-span-7 text-xs font-medium text-slate-500">
                Descrição
              </div>
              <div className="col-span-2 text-xs font-medium text-slate-500">
                Qtd
              </div>
              <div className="col-span-2 text-xs font-medium text-slate-500">
                Cód
              </div>
              <div className="col-span-1 print:hidden"></div>{" "}
              {/* Esconde o cabeçalho da lixeira no papel */}
            </div>

            {/* Linhas das peças */}
            {pecas.map((peca, index) => (
              <div
                key={index}
                className="grid grid-cols-12 print:grid-cols-12 gap-2 mb-2 items-center"
              >
                <div className="col-span-7">
                  <input
                    value={peca.descricao}
                    onChange={(e) =>
                      upadatePeca(index, "descricao", e.target.value)
                    }
                    // Adicionado print:border-none e print:p-0 para tirar a caixa ao imprimir
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-transparent"
                    placeholder="Material ou peça"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    value={peca.qtd}
                    onChange={(e) => upadatePeca(index, "qtd", e.target.value)}
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-transparent"
                    placeholder="Ex: 2"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    value={peca.cod}
                    onChange={(e) => upadatePeca(index, "cod", e.target.value)}
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-transparent"
                    placeholder="Ex: 102"
                  />
                </div>

                {/* Coluna da Lixeira com print:hidden para não sair na impressora */}
                <div className="col-span-1 flex justify-center print:hidden">
                  {pecas.length > 1 && (
                    <button
                      onClick={() => removePeca(index)}
                      className="text-red-400 hover:text-red-600 transition"
                      title="Remover linha"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Botão de adicionar com print:hidden */}
            <button
              onClick={addPeca}
              className="mt-3 text-sm text-blue-600 font-semibold hover:text-blue-800 transition flex items-center gap-1 print:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Adicionar nova peça
            </button>
          </div>

          {/*Data e Assinatura*/}
          <div className="bg-slate-50 p-4 print:p-2 rounded-md border border-slate-100 print:border-none print:bg-white">
            <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">
              DATA E ASSINATURA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm-font-medium text-slate-700 mb-1">
                    DATA/HORA Início
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Data/Hora Fim
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Assinatura do Técnico
                  </label>
                  <input
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                    placeholder="Nome do Técnico"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Assinatura Supervisor
                  </label>
                  <input
                    className="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate-400 shadow-sm"
                    placeholder="Nome do Supervisor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Ação botão*/}

      <div className="mt-8 flex justify-end print:hidden">
        <button
          onClick={handleImprimir}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded shadow-md transition duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Imprimir OS
        </button>
      </div>
    </div>
  );
}
