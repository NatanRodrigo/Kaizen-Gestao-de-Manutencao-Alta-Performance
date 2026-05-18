package com.natan.pcm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.natan.pcm.dto.UsuarioDesempenhoDTO;
import com.natan.pcm.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Método extra para o seu Login futuramente (Mantido!)
    Optional<Usuario> findByNomeLogin(String nomeLogin);

    // 1. Filtrar usuários por cargo (Eletricista, Mecânico, etc.) para listar nas
    // tabelas
    List<Usuario> findByCargoIgnoreCase(String cargo);

    // 2. A QUERY DA COMPETIÇÃO (JPQL Avançado para o Placar de Líderes)
    @Query("SELECT new com.natan.pcm.dto.UsuarioDesempenhoDTO(" +
            "u.id, u.nomeCompleto, u.cargo, u.fotoUrl, " +
            "COUNT(os.id), " +
            "SUM(FUNCTION('TIMESTAMPDIFF', MINUTE, os.dataHoraInicio, os.dataHoraFim))) " +
            "FROM Usuario u " +
            "LEFT JOIN OrdemServico os ON os.usuarioExecutor.id = u.id AND os.dataHoraFim IS NOT NULL " +
            "GROUP BY u.id " +
            "ORDER BY COUNT(os.id) DESC")
    List<UsuarioDesempenhoDTO> buscarPlacarLideres();
}