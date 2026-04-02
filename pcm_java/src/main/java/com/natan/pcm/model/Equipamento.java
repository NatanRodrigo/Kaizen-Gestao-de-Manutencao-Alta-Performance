package com.natan.pcm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "equipamentos")
public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String local;
    
    private String localInstalacao;

    private String nome;
    
    private String tag;

    private String criticidade;

    private String plano;
    
    private Integer diasProximaPreventiva;

    // O Java exige que a gente crie métodos para pegar e colocar informações (Getters e Setters)
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Integer getDiasProximaPreventiva() {
        return diasProximaPreventiva;
    }

    public void setDiasProximaPreventiva(Integer diasProximaPreventiva) {
        this.diasProximaPreventiva = diasProximaPreventiva;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getLocalInstalacao() {
        return localInstalacao;
    }

    public void setLocalInstalacao( String local_instalacao) {
        this.localInstalacao = local_instalacao;
    }

    public String getCriticidade() {
        return criticidade;
    }

    public void setCriticidade (String criticidade) {
        this.criticidade = criticidade;
    }

    public String getPlano () {
        return plano;
    }

    public void setPlano(String plano) {
        this.plano = plano;
    }
}