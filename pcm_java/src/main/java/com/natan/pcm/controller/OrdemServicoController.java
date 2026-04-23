package com.natan.pcm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.natan.pcm.model.OrdemServico;
import com.natan.pcm.repository.OrdemServicoRepository;

@RestController
@RequestMapping("/api/ordens-servico")
@CrossOrigin(origins = "*") // Libera o acesso para o React fazer as requisições sem dar erro de CORS
public class OrdemServicoController {

    @Autowired
    private OrdemServicoRepository repository;

    // 1. BUSCAR TODAS AS OS (Para listar naquela sua tela principal)
    @GetMapping
    public List<OrdemServico> listarTodas() {
        return repository.findAll();
    }

    // 2. BUSCAR UMA OS ESPECÍFICA POR ID
    @GetMapping("/{id}")
    public ResponseEntity<OrdemServico> buscarPorId(@PathVariable Long id) {
        Optional<OrdemServico> ordemServico = repository.findById(id);

        if (ordemServico.isPresent()) {
            return ResponseEntity.ok(ordemServico.get());
        }
        return ResponseEntity.notFound().build();
    }

    // 3. CRIAR UMA NOVA OS (Quando você clica em "Salvar" no front)
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrdemServico criarOS(@RequestBody OrdemServico novaOs) {
        return repository.save(novaOs);
    }

    // 4. ATUALIZAR UMA OS EXISTENTE (Para fechar a OS ou mudar status)
    @PutMapping("/{id}")
    public ResponseEntity<OrdemServico> atualizarOS(@PathVariable Long id, @RequestBody OrdemServico osAtualizada) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Garante que o ID da URL seja o mesmo do objeto antes de salvar
        osAtualizada.setId(id);
        OrdemServico osSalva = repository.save(osAtualizada);

        return ResponseEntity.ok(osSalva);
    }

    // 5. DELETAR UMA OS (Caso alguém crie errado)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarOS(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}