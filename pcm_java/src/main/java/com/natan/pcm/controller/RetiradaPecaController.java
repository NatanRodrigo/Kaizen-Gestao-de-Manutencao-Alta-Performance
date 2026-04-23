package com.natan.pcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.natan.pcm.model.Peca;
import com.natan.pcm.model.RetiradaPeca;
import com.natan.pcm.repository.PecaRepository;
import com.natan.pcm.repository.RetiradaPecaRepository;

@RestController
@RequestMapping("/api/retiradas")
@CrossOrigin(origins = "*")
public class RetiradaPecaController {

    @Autowired
    private RetiradaPecaRepository retiradaRepository;

    @Autowired
    private PecaRepository pecaRepository;

    @PostMapping
    @Transactional // Garante que se um der erro, o outro não salva (integridade)
    public RetiradaPeca registrarRetirada(@RequestBody RetiradaPeca retirada) {
        // 1. Busca a peça no estoque
        Peca peca = pecaRepository.findById(retirada.getPeca().getId())
                .orElseThrow(() -> new RuntimeException("Peça não encontrada"));

        // 2. Valida se tem estoque
        if (peca.getQuantidadeEstoque() < retirada.getQuantidadeRetirada()) {
            throw new RuntimeException("Estoque insuficiente!");
        }

        // 3. Subtrai a quantidade
        peca.setQuantidadeEstoque(peca.getQuantidadeEstoque() - retirada.getQuantidadeRetirada());
        pecaRepository.save(peca);

        // 4. Salva o histórico da retirada
        return retiradaRepository.save(retirada);
    }
}