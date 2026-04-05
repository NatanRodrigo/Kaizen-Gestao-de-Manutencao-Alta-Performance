import { useState, useEffect } from 'react'

import Sidebar from './SideBarMain/sideBar'

function App() {
  const [equipamentos, setEquipamentos] = useState([])

  // Aqui estão TODAS as variáveis agora, prontas para uso
  const [local, setLocal] = useState('')
  const [localInstalacao, setLocalInstalacao] = useState('')
  const [tag, setTag] = useState('')
  const [nome, setNome] = useState('')
  const [criticidade, setCriticidade] = useState('')
  const [plano, setPlano] = useState('')
  const [dias, setDias] = useState('')

  // Busca a lista logo que a tela abre
  useEffect(() => {
    fetch('http://localhost:8080/equipamentos')
      .then(response => response.json())
      .then(data => setEquipamentos(data))
      .catch(error => console.error("Erro ao buscar as máquinas:", error))
  }, [])

  // Essa é a função que substitui o Postman
  const salvarEquipamento = (e) => {
    e.preventDefault()

    const novaMaquina = {
      local: local,
      localInstalacao: localInstalacao, // O Java agora espera assim, sem underline
      nome: nome,
      tag: tag,
      criticidade: criticidade,
      plano: plano,
      diasProximaPreventiva: parseInt(dias)
    }

    fetch('http://localhost:8080/equipamentos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaMaquina)
    })
      .then(response => response.json())
      .then(data => {
        // Pega a máquina que o Java devolveu e joga na lista da tela na hora
        setEquipamentos([...equipamentos, data])

        // Limpa os campos para o próximo cadastro (sem códigos fantasmas do VS Code rs)
        setLocal('')
        setLocalInstalacao('')
        setNome('')
        setTag('')
        setCriticidade('')
        setPlano('')
        setDias('')
      })
      .catch(error => console.error("Erro ao salvar:", error))
  }

  return (

    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      {Sidebar}
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Controle de Equipamentos</h1>

      <div style={{ background: '#e9ecef', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0 }}>Cadastrar Novo Equipamento</h3>

        <form onSubmit={salvarEquipamento} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>LOCAL</label>
            <input
              type="text"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
              placeholder="Ex: PISO-02"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>LOCAL-INSTALAÇÃO</label>
            <input
              type="text"
              value={localInstalacao}
              onChange={(e) => setLocalInstalacao(e.target.value)}
              required
              placeholder="Ex: PISO-02-1118-5786"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>TAG</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
              placeholder="Ex: MT-02"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Nome do Equipamento</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Ex: Bomba de Água"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '250px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>CRITICIDADE</label>
            <input
              type="text"
              value={criticidade}
              onChange={(e) => setCriticidade(e.target.value)}
              required
              placeholder="Ex: A"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '80px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>PLANO</label>
            <input
              type="text"
              value={plano}
              onChange={(e) => setPlano(e.target.value)}
              required
              placeholder="Ex: PREV-ELE"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Dias Preventiva</label>
            <input
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              required
              placeholder="Ex: 30"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '80px' }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '9px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Salvar
          </button>
        </form>
      </div>

      <div>
        {equipamentos.length === 0 ? (
          <p>Nenhuma máquina cadastrada ainda.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {equipamentos.map(maquina => (
              <li
                key={maquina.id}
                style={{ background: '#f4f4f4', margin: '10px 0', padding: '15px', borderRadius: '5px', borderLeft: '5px solid #007bff' }}
              >
                <strong>{maquina.tag}</strong> - {maquina.nome}
                <br />
                <small style={{ color: '#555', display: 'block', marginTop: '5px' }}>
                  <strong>Local:</strong> {maquina.local} | <strong>Instalação:</strong> {maquina.localInstalacao} <br />
                  <strong>Criticidade:</strong> {maquina.criticidade} | <strong>Plano:</strong> {maquina.plano} <br />
                  <strong>Próxima Preventiva:</strong> em {maquina.diasProximaPreventiva} dias
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App