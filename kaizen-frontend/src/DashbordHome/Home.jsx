import Cabecalho from "./Cabecalho/Cabecalho";
import Card from "./Cards/DashboardCards";
import Painel from "./PainelDashboard/DashboardPainel";

export default function Home() {
  return (
    <div>
      <Cabecalho />

      {/*Cards Inicio*/}
      <div>
        <Card />
      </div>

      {/*Painel*/}
      <div>
        <Painel />
      </div>
    </div>
  );
}
