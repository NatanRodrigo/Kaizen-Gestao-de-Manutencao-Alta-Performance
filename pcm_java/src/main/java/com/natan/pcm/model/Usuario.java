package com.natan.pcm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    // Esse é o campo que o usuário vai digitar na tela de Login
    @Column(name = "nome_login", unique = true, nullable = false)
    private String nomeLogin;

    @Column(name = "email_empresarial", unique = true)
    private String emailEmpresarial;

    @Column(name = "senha", nullable = false)
    private String senha;

    @Column(name = "cargo")
    private String cargo;

    // Salvando o gestor como texto simples para facilitar agora
    @Column(name = "gestor")
    private String gestor;

    // Getters e Setters

    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // nome completo
    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    // Nome-Login
    public String getNomeLogin() {
        return nomeLogin;
    }

    public void setNomeLogin(String nomeLogin) {
        this.nomeLogin = nomeLogin;
    }

    // Email empressarial
    public String getEmailEmpressarial() {
        return emailEmpresarial;
    }

    public void setEmailEmpressarial(String emailEmpresarial) {
        this.emailEmpresarial = emailEmpresarial;
    }

    // Senha
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // Cargo
    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    // Gestor
    public String getGestor() {
        return gestor;
    }

    public void setGestor(String gestor) {
        this.gestor = gestor;
    }

}