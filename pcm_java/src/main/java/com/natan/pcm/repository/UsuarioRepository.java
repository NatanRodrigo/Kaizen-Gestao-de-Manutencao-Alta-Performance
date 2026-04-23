package com.natan.pcm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.natan.pcm.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método extra para o seu Login futuramente
    Optional<Usuario> findByNomeLogin(String nomeLogin);
}