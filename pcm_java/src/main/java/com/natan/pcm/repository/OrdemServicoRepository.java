package com.natan.pcm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.natan.pcm.model.OrdemServico;
import com.natan.pcm.model.TipoManutencao;

public interface OrdemServicoRepository extends JpaRepository<OrdemServico, Long> {

    // O Spring Boot é tão inteligente que só de escrever esse nome ele já cria o
    // SQL sozinho!
    List<OrdemServico> findByTipoManutencao(TipoManutencao tipoManutencao);
}