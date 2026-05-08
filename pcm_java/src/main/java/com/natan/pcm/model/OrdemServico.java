package com.natan.pcm.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ordemservico")

public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    // A linha abaixo garante que não exista duas Os com os mesmo número
    @Column(name = "numero_os", unique = true, nullable = false)
    private String numeroOs;

    // Aqui é criada uma coluna equipamento_id onde é armazenado os dados do
    // equipamento
    @ManyToOne
    @JoinColumn(name = "equipamento_id", nullable = false)
    private Equipamento equipamento;

    // Aqui onde vai ser selecionado o tipo de TipoManutenção
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_manutencao", nullable = false)
    private TipoManutencao tipoManutencao;

    // Quem está solicitando
    @Column(name = "solicitante")
    private String solicitante;

    // A data da abertura da Os
    @Column(name = "data_abertura", nullable = false, updatable = false)
    private LocalDateTime dataAbertura;

    // Aqui vai permitir texto maiores que 255 caracteres (que será um teste caso
    // não for necessario tudo isso podemos tirar até mesmo para otimização)
    @Column(name = "descricao_solicitacao", columnDefinition = "TEXT")
    private String descricaoSolicitacao;

    // Aqui será salvo o relatorio do tecnico onde ele vai descrever a atividade
    @Column(name = "relatorio_tecnico", columnDefinition = "TEXT")
    private String relatorioTecnico;

    // Data e hora fim segundo o tecnico
    @Column(name = "data_hora_inicio")
    private LocalDateTime dataHoraInicio;

    // Data e hora fim segundo o tecnico
    @Column(name = "data_hora_fim")
    private LocalDateTime dataHoraFim;

    // Usuario Nivel baixo (Tecnico, auxilixar de pcm, pcm, operadores e etc)
    @ManyToOne
    @JoinColumn(name = "tecnico_id")
    private Usuario userLow;

    // Usuario nivel medio (gerente, supervisor, coordenador e etc)
    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Usuario userMedium;

    // Usuario futurio nivel Alto(3)(Tecologia da informação)

    // O pacote é jakarta.persistence.Transient
    @jakarta.persistence.Transient
    private java.util.List<java.util.Map<String, String>> pecasFront;

    public java.util.List<java.util.Map<String, String>> getPecasFront() {
        return pecasFront;
    }

    public void setPecasFront(java.util.List<java.util.Map<String, String>> pecasFront) {
        this.pecasFront = pecasFront;
    }

    // Construtor padrão
    public OrdemServico() {
        this.dataAbertura = LocalDateTime.now();
    }

    // GETTER E SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumeroOs() {
        return numeroOs;
    }

    public void setNumeroOs(String numeroOs) {
        this.numeroOs = numeroOs;
    }

    public Equipamento getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(Equipamento equipamento) {
        this.equipamento = equipamento;
    }

    public TipoManutencao getTipoManutencao() {
        return tipoManutencao;
    }

    public void setTipoManutencao(TipoManutencao tipoManutencao) {
        this.tipoManutencao = tipoManutencao;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public String getDescricaoSolicitacao() {
        return descricaoSolicitacao;
    }

    public void setDescricaoSolicitacao(String descricaoSolicitacao) {
        this.descricaoSolicitacao = descricaoSolicitacao;
    }

    public String getRelatorioTecnico() {
        return relatorioTecnico;
    }

    public void setRelatorioTecnico(String relatorioTecnico) {
        this.relatorioTecnico = relatorioTecnico;
    }

    public LocalDateTime getDataHoraInicio() {
        return dataHoraInicio;
    }

    public void setDataHoraInicio(LocalDateTime dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }

    public LocalDateTime getDataHoraFim() {
        return dataHoraFim;
    }

    public void setDataHoraFim(LocalDateTime dataHoraFim) {
        this.dataHoraFim = dataHoraFim;
    }

    public Usuario getUserLow() {
        return userLow;
    }

    public void setUserLow(Usuario userLow) {
        this.userLow = userLow;
    }

    public Usuario getUserMedium() {
        return userMedium;
    }

    public void setUserMedium(Usuario userMedium) {
        this.userMedium = userMedium;
    }
}
