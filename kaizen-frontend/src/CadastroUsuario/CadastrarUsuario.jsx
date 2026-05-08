import { useState } from "react";

export default function CadastrarUsuario() {
  const [usuario, setUsuario] = useState({
    nomeCompleto: "",
    nomeLogin: "",
    senha: "",
    cargo: "",
    emailEmpresarial: "",
    gestor: "",
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSalvar = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        // Limpa o formulário
        setUsuario({
          nomeCompleto: "",
          nomeLogin: "",
          senha: "",
          cargo: "",
          emailEmpresarial: "",
          gestor: "",
        });
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na comunicação:", error);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Cadastrar Novo Usuário
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Adicione técnicos, gestores e operadores ao sistema
        </p>
      </div>

      <form
        onSubmit={handleSalvar}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nome Completo */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="nomeCompleto"
              value={usuario.nomeCompleto}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="Ex: Daniel Faria Vaz"
            />
          </div>

          {/* Nome Login */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Nome de Login
            </label>
            <input
              type="text"
              name="nomeLogin"
              value={usuario.nomeLogin}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="Ex: daniel.faria"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Senha Inicial
            </label>
            <input
              type="text"
              name="senha"
              value={usuario.senha}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="Senha provisória"
            />
          </div>

          {/* Cargo */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Cargo
            </label>
            <select
              name="cargo"
              value={usuario.cargo}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Selecione o cargo...</option>
              <option value="Mecânico">Mecânico</option>
              <option value="Eletricista">Eletricista</option>
              <option value="Desenvolvedor">Desenvolvedor</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Gerente">Gerente</option>
            </select>
          </div>

          {/* E-mail Empresarial */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              E-mail Empresarial
            </label>
            <input
              type="email"
              name="emailEmpresarial"
              value={usuario.emailEmpresarial}
              onChange={handleChange}
              className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="Ex: eletricista@teste.com"
            />
          </div>

          {/* Gestor Responsável */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Gestor Direto
            </label>
            <input
              type="text"
              name="gestor"
              value={usuario.gestor}
              onChange={handleChange}
              className="w-full bg-slate-50 text-slate-700 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:outline-none"
              placeholder="Ex: Michael Jackson"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
          >
            Salvar Usuário
          </button>
        </div>
      </form>
    </div>
  );
}
