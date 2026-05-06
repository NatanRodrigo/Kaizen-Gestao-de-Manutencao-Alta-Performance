package com.natan.pcm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders; // Adicionado para o PDF
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType; // Adicionado para o PDF
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
import com.natan.pcm.service.OrdemServicoPdfService;

@RestController
@RequestMapping("/api/ordens-servico")
@CrossOrigin(origins = "*") // Libera o acesso para o React fazer as requisições sem dar erro de CORS
public class OrdemServicoController {

    @Autowired
    private OrdemServicoRepository repository;

    // 0. SERVIÇO DE PDF INJETADO AQUI
    @Autowired
    private OrdemServicoPdfService pdfService;

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

    // 3. CRIAR UMA NOVA OS (Quando você clica apenas em "Salvar" no front)
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

    // ========================================================================
    // 6. CRIAR NOVA OS E GERAR PDF (Quando clica em "Salvar e Gerar PDF")
    // ========================================================================
    @PostMapping("/gerar-pdf")
    public ResponseEntity<byte[]> salvarEGerarPdf(@RequestBody OrdemServico novaOs) {

        try {
            // 1. Salva a OS no banco enviada pelo React (só com os IDs)
            OrdemServico osSalva = repository.save(novaOs);

            // 2. BUSCA A OS COMPLETA NO BANCO!
            // Isso garante que os nomes do Equipamento e dos Técnicos sejam carregados
            OrdemServico osCompleta = repository.findById(osSalva.getId()).orElse(osSalva);

            // 3. Chama o serviço de PDF passando a OS Completa
            byte[] pdfBytes = pdfService.gerarPdf(osCompleta);

            // 4. Configura os Headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);

            String numeroIdentificador = osCompleta.getNumeroOs() != null ? osCompleta.getNumeroOs()
                    : String.valueOf(osCompleta.getId());
            headers.setContentDispositionFormData("inline", "OS_" + numeroIdentificador + ".pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            // Se der qualquer erro, vai printar de vermelho no seu console do VS Code
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}