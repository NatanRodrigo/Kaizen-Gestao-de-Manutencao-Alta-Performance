package com.natan.pcm.dto;

//Essa classe serve apenas para levar os dados calculados para o front-end, baseados na imagem image_51c31e.png que você enviou.
// DTO para carregar os dados da "Mini Competição"
public class UsuarioDesempenhoDTO {
    private Long id;
    private String nomeCompleto;
    private String cargo;
    private String fotoUrl;
    private Long tarefasConcluidas; // Quantidade de OS fechadas
    private Long minutosTrabalhadosTotal; // Soma do tempo gasto nas OS

    // Construtor completo (importante para a query do Hibernate)
    public UsuarioDesempenhoDTO(Long id, String nomeCompleto, String cargo, String fotoUrl, Long tarefasConcluidas,
            Long minutosTrabalhadosTotal) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.cargo = cargo;
        this.fotoUrl = fotoUrl;
        this.tarefasConcluidas = tarefasConcluidas != null ? tarefasConcluidas : 0L;
        // Se der nulo (nenhuma OS fechada), assume 0
        this.minutosTrabalhadosTotal = minutosTrabalhadosTotal != null ? minutosTrabalhadosTotal : 0L;
    }

    // Getters e Setters (pode gerar automaticamente pelo VS Code)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public Long getTarefasConcluidas() {
        return tarefasConcluidas;
    }

    public void setTarefasConcluidas(Long tarefasConcluidas) {
        this.tarefasConcluidas = tarefasConcluidas;
    }

    public Long getMinutosTrabalhadosTotal() {
        return minutosTrabalhadosTotal;
    }

    public void setMinutosTrabalhadosTotal(Long minutosTrabalhadosTotal) {
        this.minutosTrabalhadosTotal = minutosTrabalhadosTotal;
    }
}