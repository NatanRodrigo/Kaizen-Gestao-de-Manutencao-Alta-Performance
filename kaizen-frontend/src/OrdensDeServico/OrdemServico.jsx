import BarChart from "../Graficos/BarChart";

function OrdensDeServico(params) {
  return (
    <div className="p-6 bg-slate-50 min-h-screen flex flex-col gap-6">
      {/*Titulo*/}
      <div>
        <h1 className="text-teal-700 font-bold text-2xl">
          Painel Ordens de Serviço
        </h1>
        <h3 className="text-teal-900 font-bold text-xs mt-1">
          Gerencie suas ordens de serviço
        </h3>
      </div>

      {/*Butão Gerar Os*/}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 w-full">
        <div>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              xmlns="http://w3.org"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Criar Nova Os</span>
          </button>
        </div>

        {/*Filtrar os por data versão teste*/}

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Data Abertura
            </label>
            <input
              type="date"
              className="w-100 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate400 shadow-sm"
            />
          </div>
        </div>

        {/*Pesquisar por os*/}

        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Pesquisar Ordem Serviço
          </label>
          <input
            className="w-100 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-500 hover:border-slate400 shadow-sm"
            placeholder="Digite o n° ou tag do equipamento"
          />
        </div>
      </div>

      {/*Filtro (andamento,executadas,todas OS etc*/}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-full items-start">
        <div className="lg-col-span-1 flex flex-col text-gray-700 bg-white shadow-md rounded-xl w-full bg-clip-border">
          <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
            <div
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900"
            >
              Todas as OS
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                  <span className="">(15)</span>
                </div>
              </div>
            </div>
            {/*Em andamento*/}
            <div
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900"
            >
              Em andamento
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                  <span className="">(356)</span>
                </div>
              </div>
            </div>
            {/*Executadas*/}
            <div
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900"
            >
              Executadas
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                  <span className="">(1565)</span>
                </div>
              </div>
            </div>
            {/*Reprogramadas*/}
            <div
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900"
            >
              Reprogramadas
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                  <span className="">(1516)</span>
                </div>
              </div>
            </div>
            {/*Canceladas*/}
            <div
              role="button"
              className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:text-blue-gray-900"
            >
              Canceladas
              <div className="grid ml-auto place-items-center justify-self-end">
                <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10">
                  <span className="">(36)</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/*Grafico*/}
        <div className="lg:col-span-3 bg-white p-6 shadow-md rounded-xl w-full border border-gray-100">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Relatório Manutenção Mensal
          </h1>
          <div className="w-full">
            <BarChart />
          </div>
        </div>
      </div>

      {/*Tabela*/}
      <div className="bg-white shadow-md rounded-xl w-full p-4 mt-2 min-h-[200px]">
        <div class="w-full overflow-x-auto">
          <table class="table-striped table">
            <thead>
              <tr>
                <th>N° OS</th>
                <th>Tag Equipamento</th>
                <th>Tipo</th>
                <th>Prioridade</th>
                <th>Técnico Responsável</th>
                <th>Data de Criação</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>452</td>
                <td>TC-102</td>
                <td>
                  <span class="badge badge-soft badge-success text-xs">
                    Preventiva
                  </span>
                </td>
                <td>Alta</td>
                <td>Jin-Woo</td>
                <td>15/02/2026</td>
                <td>
                  <span className="inline-flex items-center px-2 py-1 ring-1 ring-inset ring-danger-subtle text-fg-danger-strong text-sm font-medium rounded bg-danger-soft">
                    Atrasado
                  </span>
                </td>
                <td>
                  <button></button>
                </td>
                <td>
                  <button
                    class="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span class="icon-[tabler--pencil] size-5"></span>
                  </button>
                  <button
                    class="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span class="icon-[tabler--trash] size-5"></span>
                  </button>
                  <button
                    class="btn btn-circle btn-text btn-sm"
                    aria-label="Action button"
                  >
                    <span class="icon-[tabler--dots-vertical] size-5"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/*Navegação entre paginas*/}

      <div>
        <nav aria-label="Page navigation example">
          <ul class="flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-4 h-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m15 19-7-7 7-7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center text-fg-brand bg-neutral-tertiary-medium box-border border border-default-medium hover:text-fg-brand font-medium text-sm w-9 h-9 focus:outline-none"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-4 h-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
