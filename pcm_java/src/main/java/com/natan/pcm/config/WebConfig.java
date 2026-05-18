package com.natan.pcm.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Define onde as fotos serão salvas no seu computador
    public static final String UPLOAD_DIR = "uploads/fotos-perfil";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Quando o React pedir /uploads/**, o Java busca na pasta física uploads/
        Path uploadDir = Paths.get(UPLOAD_DIR);
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/" + uploadPath + "/");
    }
}