package com.natan.pcm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.natan.pcm.model.Equipamento;
import com.natan.pcm.repository.EquipamentoRepository;

import java.util.List;

@RestController
@RequestMapping("/equipamentos")
@CrossOrigin(origins = "*") // Missão 4: Fronteira aberta! O React já pode entrar.
public class EquipamentoController {

    @Autowired
    private EquipamentoRepository repository;

    // Rota para CRIAR uma máquina (O que você já tinha feito)
    @PostMapping
    public Equipamento cadastrar(@RequestBody Equipamento equipamento) {
        return repository.save(equipamento);
    }

    // Rota para LISTAR todas as máquinas (O que você já tinha feito)
    @GetMapping
    public List<Equipamento> listar() {
        return repository.findAll();
    }

    // Missão 1 e 3: Rota para ATUALIZAR com proteção contra ID Fantasma
    @PutMapping("/{id}")
    public ResponseEntity<Equipamento> atualizar(@PathVariable Long id, @RequestBody Equipamento equipamentoAtualizado) {
        return repository.findById(id)
            .map(equipamento -> {
                equipamento.setLocal(equipamentoAtualizado.getLocal());
                equipamento.setLocalInstalacao(equipamentoAtualizado.getLocalInstalacao());
                equipamento.setNome(equipamentoAtualizado.getNome());
                equipamento.setTag(equipamentoAtualizado.getTag());
                equipamento.setCriticidade(equipamentoAtualizado.getCriticidade());
                equipamento.setPlano(equipamentoAtualizado.getPlano());
                equipamento.setDiasProximaPreventiva(equipamentoAtualizado.getDiasProximaPreventiva());
                
                Equipamento atualizado = repository.save(equipamento);
                return ResponseEntity.ok(atualizado);
            })
            .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não achar a máquina
    }

    // Missão 2 e 3: Rota para DELETAR com proteção
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return repository.findById(id)
            .map(equipamento -> {
                repository.delete(equipamento);
                return ResponseEntity.noContent().<Void>build(); // Retorna 204 (Sucesso, sem conteúdo para mostrar)
            })
            .orElse(ResponseEntity.notFound().build()); // Retorna 404 se a máquina já não existir
    }
    
    // Rota secreta para importar a planilha de uma vez só
@PostMapping("/lote")
public List<Equipamento> cadastrarEmLote(@RequestBody List<Equipamento> listaEquipamentos) {
    return repository.saveAll(listaEquipamentos);
}
}