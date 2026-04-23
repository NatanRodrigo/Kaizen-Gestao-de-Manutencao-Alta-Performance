package com.natan.pcm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.natan.pcm.model.RetiradaPeca;

@Repository
public interface RetiradaPecaRepository extends JpaRepository<RetiradaPeca, Long> {
}