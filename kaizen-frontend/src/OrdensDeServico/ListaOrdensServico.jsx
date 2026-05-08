import { useEffect, useState } from "react";

// O componente recebe o "tipo" como propriedade.
// Exemplo: <ListaOrdensServico tipo="PREVENTIVA" />
export default function ListaOrdensServico({ tipo }) {
  const [ordens, setOrdens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Separei a busca em uma função para podermos chamar de novo após atualizar uma OS
  const carregarOrdens = () => {
    const url = tipo
      ? `http://localhost:8080/api/ordens-servico?tipo=${tipo}`
      : `http://localhost:8080/api/ordens-servico`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrdens(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar ordens:", err);
        setCarregando(false);
      });
  };

  useEffect(() => {
    carregarOrdens();
  }, [tipo]);

  // Função 1: Apenas calcula o status baseado nas datas
  const calcularStatus = (os) => {
    // Trocamos para os nomes exatos que estão no seu Java
    if (os.dataHoraFim) return "CONCLUIDA";
    if (os.dataHoraInicio) return "EM_ANDAMENTO";
    return "ABERTA";
  };

  // Função 2: Desenha a pílula colorida
  const renderizarBadgeStatus = (status) => {
    switch (status) {
      case "CONCLUIDA":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold whitespace-nowrap">
            Concluída
          </span>
        );
      case "EM_ANDAMENTO":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold whitespace-nowrap">
            Em Andamento
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold whitespace-nowrap">
            Aberta
          </span>
        );
    }
  };

  // Função Nova: Atualiza a OS no banco de dados com a data e hora atual
  const avancarStatus = async (os) => {
    const statusAtual = calcularStatus(os);
    const osAtualizada = { ...os };
    const dataHoraAgora = new Date().toISOString();

    if (statusAtual === "ABERTA") {
      osAtualizada.dataHoraInicio = dataHoraAgora; // <- Ajustado aqui
    } else if (statusAtual === "EM_ANDAMENTO") {
      osAtualizada.dataHoraFim = dataHoraAgora; // <- Ajustado aqui
    } else {
      return; // Se já está concluída, não faz nada
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/ordens-servico/${os.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(osAtualizada),
        },
      );

      if (response.ok) {
        carregarOrdens();
      } else {
        console.error("Erro ao atualizar o status da ordem de serviço.");
      }
    } catch (error) {
      console.error("Falha na comunicação com o servidor:", error);
    }
  };

  if (carregando) {
    return (
      <div className="p-8 text-slate-500 font-bold text-center">
        Buscando dados no servidor...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manutenções{" "}
            {tipo
              ? tipo.charAt(0) + tipo.slice(1).toLowerCase() + "s"
              : "Gerais"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gerencie as ordens de serviço geradas no sistema
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4 font-bold">OS</th>
                <th className="px-6 py-4 font-bold">Equipamento</th>
                <th className="px-6 py-4 font-bold">Solicitante</th>
                <th className="px-6 py-4 font-bold">Data Abertura</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {ordens.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Nenhuma ordem de serviço encontrada.
                  </td>
                </tr>
              ) : (
                ordens.map((os) => {
                  const statusAtual = calcularStatus(os);

                  return (
                    <tr
                      key={os.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {os.numeroOs}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="font-semibold">
                          {os.equipamento?.nome || "Sem equipamento"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {os.equipamento?.tag || "Sem Tag"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {os.solicitante}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(os.dataAbertura).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4">
                        {renderizarBadgeStatus(statusAtual)}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        {/* Botões Dinâmicos de Ação */}
                        {statusAtual === "ABERTA" && (
                          <button
                            onClick={() => avancarStatus(os)}
                            className="text-white font-bold text-xs bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Iniciar
                          </button>
                        )}

                        {statusAtual === "EM_ANDAMENTO" && (
                          <button
                            onClick={() => avancarStatus(os)}
                            className="text-white font-bold text-xs bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Finalizar
                          </button>
                        )}

                        <button className="text-slate-600 hover:text-slate-900 font-bold text-xs bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
