package com.natan.pcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.natan.pcm.model.OrdemServico;

@Repository
public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {
    // O Spring Boot já cria os comandos SQL de Insert, Select, Update e Delete
    // sozinho aqui!
}