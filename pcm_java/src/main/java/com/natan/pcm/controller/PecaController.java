package com.natan.pcm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.natan.pcm.model.Peca;
import com.natan.pcm.repository.PecaRepository;

@RestController
@RequestMapping("/api/pecas")
@CrossOrigin(origins = "*")
public class PecaController {

    @Autowired
    private PecaRepository repository;

    @GetMapping
    public List<Peca> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Peca cadastrar(@RequestBody Peca peca) {
        return repository.save(peca);
    }
}