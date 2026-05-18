import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemTI, setMensagemTI] = useState(false);

  const handleEntrar = (e) => {
    e.preventDefault();
    console.log("Tentando logar com:", login, senha);
  };

  const handleEsqueciSenha = () => {
    setMensagemTI(true);
    setTimeout(() => setMensagemTI(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex animate-fade-in">
      {/* --- PAINEL ESQUERDO: VIBE AUTOMAÇÃO / TERMINAL --- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between overflow-hidden bg-slate-950 p-12 border-r border-slate-800">
        {/* Fundo estilo "Blueprint" (Grade de Engenharia) */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Brilho radial no fundo (simulando LED de CPU/Placa) */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-600/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-600/20 rounded-full blur-[100px]"></div>

        {/* LOGO SUPERIOR */}
        <div className="relative z-20">
          <div className="flex items-center gap-3">
            <svg
              className="w-10 h-10 text-cyan-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <div>
              <h1 className="text-4xl font-black text-white tracking-widest uppercase">
                KAIZEN
              </h1>
              <p className="text-[10px] text-cyan-400 font-mono tracking-[0.3em] mt-1">
                INDUSTRIAL KERNEL v2.0
              </p>
            </div>
          </div>
        </div>

        {/* CENTRO: JANELA DE TERMINAL (Estilo Código/CLP) */}
        <div className="relative z-20 w-full max-w-lg mt-8">
          <div className="bg-slate-900/80 border border-slate-700 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Barra superior do terminal */}
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-slate-400 font-mono">
                robot_controller.py
              </span>
            </div>
            {/* Corpo do terminal com código rodando */}
            <div className="p-5 font-mono text-xs sm:text-sm text-emerald-400 space-y-2 opacity-90">
              <p>
                <span className="text-slate-500">1</span> root@kaizen-sys:~#
                init_maintenance_protocol()
              </p>
              <p className="animate-pulse">
                <span className="text-slate-500">2</span> [OK] Connecting to PLC
                network...
              </p>
              <p>
                <span className="text-slate-500">3</span> [OK] Calibrating
                servos (config=0x8F)
              </p>
              <p>
                <span className="text-slate-500">4</span> [OK] Loading order
                OS-8738 (TRANSPORTADOR TC-1)
              </p>
              <p>
                <span className="text-slate-500">5</span>{" "}
                <span className="text-cyan-400">def</span>{" "}
                <span className="text-yellow-300">calibrate_sensors</span>
                (node_id):
              </p>
              <p className="pl-4">
                <span className="text-slate-500">6</span> status =
                sync_with_master(node_id)
              </p>
              <p className="pl-4">
                <span className="text-slate-500">7</span>{" "}
                <span className="text-cyan-400">return</span> status =={" "}
                <span className="text-orange-400">"IDLE"</span>
              </p>
              <p>
                <span className="text-slate-500">8</span> System online.
                Awaiting user auth...
              </p>
              <p className="animate-pulse text-cyan-400">_</p>
            </div>
          </div>

          <div className="mt-8 border-l-2 border-cyan-500 pl-4">
            <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
              Controle Central de Operações
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-medium max-w-md leading-relaxed">
              Orquestração de equipes, controle de ordens de serviço e
              monitoramento de ativos da Indústria 4.0. Conecte-se para assumir
              o controle da fábrica.
            </p>
          </div>
        </div>

        {/* RODAPÉ DO PAINEL ESQUERDO */}
        <div className="relative z-20 flex justify-between items-center text-xs text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} NEXO DESENVOLVIMENTO</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SYSTEM SECURE
          </span>
        </div>
      </div>

      {/* --- PAINEL DIREITO: FORMULÁRIO DE LOGIN (MANTIDO LIMPO) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 bg-white lg:bg-slate-50 relative">
        {/* Pequeno detalhe para integrar os dois lados */}
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-4 h-16 bg-white rounded-r-lg border-y border-r border-slate-200 shadow-[2px_0_10px_rgba(0,0,0,0.05)] z-10"></div>

        <div className="max-w-md w-full bg-white lg:p-10 lg:rounded-3xl lg:shadow-xl lg:border lg:border-slate-100 transition-all duration-300">
          <div className="mb-10 lg:text-center">
            <h2 className="text-4xl font-extrabold text-slate-950 tracking-tighter">
              Autenticação
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Insira suas credenciais para acessar o painel Kaizen.
            </p>
          </div>

          <form onSubmit={handleEntrar} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">
                Usuário do Sistema
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Ex: natan.rodrigo"
                className="w-full bg-slate-100 text-slate-900 px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all font-mono text-sm"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-slate-800">
                  Senha
                </label>
                <button
                  type="button"
                  onClick={handleEsqueciSenha}
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-800 transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-100 text-slate-900 px-5 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all font-mono text-sm"
                required
              />
            </div>

            {mensagemTI && (
              <div className="bg-slate-900 text-cyan-400 p-4 rounded-xl text-sm font-mono border border-cyan-900 shadow-inner flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-cyan-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  Sinal enviado. O administrador da rede foi notificado para
                  redefinir sua credencial.
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span>INICIAR SESSÃO</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
