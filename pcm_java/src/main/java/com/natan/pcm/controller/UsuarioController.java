package com.natan.pcm.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.natan.pcm.config.WebConfig;
import com.natan.pcm.dto.UsuarioDesempenhoDTO;
import com.natan.pcm.model.Usuario;
import com.natan.pcm.repository.UsuarioRepository; // Importando a config de uploads

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    // 1. LISTAR USUÁRIOS (Agora aceita filtro por cargo se o React pedir)
    @GetMapping
    public List<Usuario> listar(@RequestParam(required = false) String cargo) {
        if (cargo != null && !cargo.isEmpty()) {
            return repository.findByCargoIgnoreCase(cargo);
        }
        return repository.findAll();
    }

    // 2. CRIAR USUÁRIO (Agora preparado para receber Arquivo de Foto)
    @PostMapping(consumes = { "multipart/form-data" })
    public Usuario criar(
            @ModelAttribute Usuario usuario, // Recebe os dados de texto
            @RequestParam(value = "foto", required = false) MultipartFile fotoFile) throws IOException { // Recebe a
                                                                                                         // imagem

        // Se veio uma foto na requisição, a gente salva na pasta física
        if (fotoFile != null && !fotoFile.isEmpty()) {
            String nomeOriginal = fotoFile.getOriginalFilename();
            String extensao = nomeOriginal.substring(nomeOriginal.lastIndexOf("."));
            String novoNome = UUID.randomUUID().toString() + extensao; // Nome único para evitar conflito

            Path diretorio = Paths.get(WebConfig.UPLOAD_DIR);

            if (!Files.exists(diretorio)) {
                Files.createDirectories(diretorio);
            }

            Path caminhoArquivo = diretorio.resolve(novoNome);
            Files.copy(fotoFile.getInputStream(), caminhoArquivo, StandardCopyOption.REPLACE_EXISTING);

            // Grava o nome do arquivo gerado no banco de dados
            usuario.setFotoUrl(novoNome);
        }

        // Salva tudo no banco
        return repository.save(usuario);
    }

    // 3. ENDPOINT DA COMPETIÇÃO: Retorna os dados mastigados pro React
    @GetMapping("/placar")
    public List<UsuarioDesempenhoDTO> buscarPlacar() {
        return repository.buscarPlacarLideres();
    }
}