import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

// --- FUNÇÃO AUXILIAR PARA CORTAR A IMAGEM NOS BASTIDORES ---
// Essa função pega a imagem original, as coordenadas do zoom/corte e gera um novo arquivo físico
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // Cria um arquivo físico a partir do pedaço recortado
      const file = new File([blob], "foto_perfil.jpg", { type: "image/jpeg" });
      resolve({ file, url: URL.createObjectURL(blob) });
    }, "image/jpeg");
  });
};
// ------------------------------------------------------------

export default function CadastrarUsuario() {
  const [usuario, setUsuario] = useState({
    nomeCompleto: "",
    nomeLogin: "",
    senha: "",
    cargo: "",
    emailEmpresarial: "",
    gestor: "",
  });

  // Estados da Imagem Final
  const [fotoFinal, setFotoFinal] = useState(null); // Arquivo que vai pro Java
  const [previewFoto, setPreviewFoto] = useState(null); // Imagem redondinha na tela

  // Estados do Recorte (Cropper)
  const [imagemOriginal, setImagemOriginal] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  // 1. O usuário escolhe a foto do computador
  const handleSelecionarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagemOriginal(imageUrl);
      setIsCropping(true); // Abre a janela de recorte
      e.target.value = ""; // Limpa o input
    }
  };

  // 2. O Cropper avisa quais são as coordenadas exatas do corte
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 3. O usuário clica em "Confirmar Corte"
  const confirmarCorte = async () => {
    try {
      // Chama a nossa função auxiliar lá de cima
      const { file, url } = await getCroppedImg(
        imagemOriginal,
        croppedAreaPixels,
      );
      setFotoFinal(file);
      setPreviewFoto(url);
      setIsCropping(false); // Fecha a janela
    } catch (e) {
      console.error("Erro ao cortar a imagem", e);
    }
  };

  const cancelarCorte = () => {
    setIsCropping(false);
    setImagemOriginal(null);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nomeCompleto", usuario.nomeCompleto);
    formData.append("nomeLogin", usuario.nomeLogin);
    formData.append("senha", usuario.senha);
    formData.append("cargo", usuario.cargo);
    formData.append("emailEmpresarial", usuario.emailEmpresarial);
    formData.append("gestor", usuario.gestor);

    if (fotoFinal) {
      formData.append("foto", fotoFinal);
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setUsuario({
          nomeCompleto: "",
          nomeLogin: "",
          senha: "",
          cargo: "",
          emailEmpresarial: "",
          gestor: "",
        });
        setFotoFinal(null);
        setPreviewFoto(null);
      } else {
        alert("Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro na comunicação:", error);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto w-full animate-fade-in relative">
      {/* --- JANELA MODAL DE RECORTE (Sobrepõe a tela) --- */}
      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">
                Ajustar Foto de Perfil
              </h3>
              <button
                onClick={cancelarCorte}
                className="text-slate-400 hover:text-red-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Área do Cropper */}
            <div className="relative h-80 w-full bg-slate-900">
              <Cropper
                image={imagemOriginal}
                crop={crop}
                zoom={zoom}
                aspect={1} // Força a ser um quadrado perfeito (1:1)
                cropShape="round" // Mostra um círculo para o usuário ter noção de como vai ficar
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            {/* Controles de Zoom e Botões */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-3">
                  Zoom
                </label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelarCorte}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarCorte}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Confirmar Corte
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ------------------------------------------------ */}

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
        {/* ÁREA DE UPLOAD DA FOTO */}
        <div className="flex flex-col items-center mb-8 pb-8 border-b border-slate-100">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 w-full text-left">
            Foto de Perfil
          </label>
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 flex items-center justify-center shadow-md">
              {previewFoto ? (
                <img
                  src={previewFoto}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-12 h-12 text-slate-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>

            <label className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-white text-xs font-bold">Alterar</span>
              {/* O input chama o selecionador de foto novo */}
              <input
                type="file"
                accept="image/*"
                onChange={handleSelecionarFoto}
                className="hidden"
              />
            </label>
          </div>
        </div>

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
