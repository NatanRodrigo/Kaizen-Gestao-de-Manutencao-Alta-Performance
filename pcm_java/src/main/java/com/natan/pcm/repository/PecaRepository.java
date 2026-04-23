package com.natan.pcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.natan.pcm.model.Peca;

@Repository
public interface PecaRepository extends JpaRepository<Peca, Long> {
}