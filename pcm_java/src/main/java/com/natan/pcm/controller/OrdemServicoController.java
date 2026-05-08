package com.natan.pcm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.natan.pcm.model.OrdemServico;
import com.natan.pcm.model.TipoManutencao;
import com.natan.pcm.repository.EquipamentoRepository;
import com.natan.pcm.repository.OrdemServicoRepository;
import com.natan.pcm.service.OrdemServicoPdfService;

@RestController
@RequestMapping("/api/ordens-servico")
@CrossOrigin(origins = "*") // Libera o acesso para o React fazer as requisições sem dar erro de CORS
public class OrdemServicoController {

    @Autowired
    private EquipamentoRepository equipRepository;

    @Autowired
    private OrdemServicoRepository repository;

    // 0. SERVIÇO DE PDF INJETADO AQUI
    @Autowired
    private OrdemServicoPdfService pdfService;

    // 1. BUSCAR AS OS (Com ou sem filtro para as telas do React)
    @GetMapping
    public List<OrdemServico> listarTodas(@RequestParam(required = false) String tipo) {
        // Se o React mandar um tipo (ex: PREVENTIVA), a gente filtra
        if (tipo != null && !tipo.isEmpty()) {
            TipoManutencao tipoEnum = TipoManutencao.valueOf(tipo.toUpperCase());
            return repository.findByTipoManutencao(tipoEnum);
        }

        // Se não mandar nada, devolve todas
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

            OrdemServico osSalva = repository.save(novaOs);
            OrdemServico osCompleta = repository.findById(osSalva.getId()).orElse(osSalva);

            // 1. FORÇA A BUSCA DO NOME DO EQUIPAMENTO
            if (osCompleta.getEquipamento() != null && osCompleta.getEquipamento().getId() != null) {
                equipRepository.findById(osCompleta.getEquipamento().getId())
                        .ifPresent(osCompleta::setEquipamento);
            }

            // 2. MÁGICA AQUI: Recupera as peças que o banco ignorou
            // Copia as peças da 'novaOs' (que veio do React) para a 'osCompleta' (que vai
            // pro PDF)
            osCompleta.setPecasFront(novaOs.getPecasFront());

            // 3. Agora sim, manda gerar o PDF
            byte[] pdfBytes = pdfService.gerarPdf(osCompleta);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            String numeroIdentificador = osCompleta.getNumeroOs() != null ? osCompleta.getNumeroOs()
                    : String.valueOf(osCompleta.getId());
            headers.setContentDispositionFormData("inline", "OS_" + numeroIdentificador + ".pdf");
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}