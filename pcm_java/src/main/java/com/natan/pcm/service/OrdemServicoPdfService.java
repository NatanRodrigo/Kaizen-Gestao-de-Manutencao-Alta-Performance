package com.natan.pcm.service;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;

import org.openpdf.text.Document;
import org.openpdf.text.Element;
import org.openpdf.text.Font;
import org.openpdf.text.FontFactory;
import org.openpdf.text.PageSize;
import org.openpdf.text.Paragraph;
import org.openpdf.text.Phrase;
import org.openpdf.text.Rectangle;
import org.openpdf.text.pdf.PdfPCell;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import com.natan.pcm.model.OrdemServico;

@Service
public class OrdemServicoPdfService {

    public byte[] gerarPdf(OrdemServico os) {
        Document document = new Document(PageSize.A4, 40, 40, 50, 40); // Margens um pouco mais largas
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            // === FONTES ===
            Font fonteTitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font fonteSubtitulo = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font fontePadrao = FontFactory.getFont(FontFactory.HELVETICA, 10);
            Font fonteNegrito = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
            Font fontePequena = FontFactory.getFont(FontFactory.HELVETICA, 9);

            // === RESGATE SEGURO DE DADOS ===
            String numOs = os.getNumeroOs() != null ? os.getNumeroOs() : "SEM NÚMERO";
            String tipoManut = os.getTipoManutencao() != null ? os.getTipoManutencao().toString() : "Não informado";
            String nomeSolicitante = os.getSolicitante() != null ? os.getSolicitante() : "Não informado";
            String descricao = os.getDescricaoSolicitacao() != null ? os.getDescricaoSolicitacao()
                    : "Nenhuma descrição fornecida.";
            String relatorio = os.getRelatorioTecnico() != null ? os.getRelatorioTecnico()
                    : "Relatório não preenchido.";

            // Formatador de data pro padrão BR
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            String dataAbertura = os.getDataAbertura() != null ? os.getDataAbertura().format(formatter) : "N/A";

            String nomeEquipamento = "Equipamento ID não localizado";
            if (os.getEquipamento() != null) {
                nomeEquipamento = os.getEquipamento().getNome() != null ? os.getEquipamento().getNome()
                        : "Equipamento " + os.getEquipamento().getId();
            }

            // === CABEÇALHO ===
            Paragraph titulo = new Paragraph("KAIZEN - GESTÃO DE MANUTENÇÃO", fonteTitulo);
            titulo.setAlignment(Element.ALIGN_CENTER);
            document.add(titulo);

            Paragraph subtitulo = new Paragraph("ORDEM DE SERVIÇO Nº " + numOs, fonteSubtitulo);
            subtitulo.setAlignment(Element.ALIGN_CENTER);
            subtitulo.setSpacingAfter(30);
            document.add(subtitulo);

            // === 1. IDENTIFICAÇÃO DO EQUIPAMENTO ===
            document.add(new Paragraph("1. Identificação do Equipamento", fonteNegrito));
            PdfPTable tableEquip = new PdfPTable(3);
            tableEquip.setWidthPercentage(100);
            tableEquip.setSpacingBefore(5);
            tableEquip.setSpacingAfter(15);

            tableEquip.addCell(new Phrase("Equipamento: \n" + nomeEquipamento, fontePadrao));
            tableEquip.addCell(new Phrase("TAG/Cód: \n" + numOs, fontePadrao));
            tableEquip.addCell(new Phrase("Tipo: \n" + tipoManut, fontePadrao));
            document.add(tableEquip);

            // === 2. DETALHES DA SOLICITAÇÃO ===
            document.add(new Paragraph("2. Detalhes da Solicitação", fonteNegrito));
            PdfPTable tableSolicitacao = new PdfPTable(2);
            tableSolicitacao.setWidthPercentage(100);
            tableSolicitacao.setSpacingBefore(5);
            tableSolicitacao.setSpacingAfter(10);

            tableSolicitacao.addCell(new Phrase("Solicitante: \n" + nomeSolicitante, fontePadrao));
            tableSolicitacao.addCell(new Phrase("Data de Abertura: \n" + dataAbertura, fontePadrao));
            document.add(tableSolicitacao);

            Paragraph tituloDesc = new Paragraph("Descrição do Problema / Atividade:", fonteNegrito);
            document.add(tituloDesc);
            Paragraph desc = new Paragraph(descricao, fontePadrao);
            desc.setSpacingAfter(15);
            document.add(desc);

            // === 3. MATERIAIS E PEÇAS UTILIZADOS ===
            if (os.getPecasFront() != null && !os.getPecasFront().isEmpty()) {
                document.add(new Paragraph("3. Materiais e Peças Utilizados", fonteNegrito));
                PdfPTable tablePecas = new PdfPTable(3);
                tablePecas.setWidthPercentage(100);
                tablePecas.setWidths(new float[] { 6f, 2f, 2f }); // Tamanho das colunas
                tablePecas.setSpacingBefore(5);
                tablePecas.setSpacingAfter(15);

                // Cabeçalho da tabela
                tablePecas.addCell(new Phrase("Descrição da Peça", fonteNegrito));
                tablePecas.addCell(new Phrase("Qtd", fonteNegrito));
                tablePecas.addCell(new Phrase("Código", fonteNegrito));

                // Preenche as linhas com o que veio do React
                for (java.util.Map<String, String> peca : os.getPecasFront()) {
                    tablePecas.addCell(new Phrase(peca.getOrDefault("descricao", ""), fontePadrao));
                    tablePecas.addCell(new Phrase(peca.getOrDefault("qtd", ""), fontePadrao));
                    tablePecas.addCell(new Phrase(peca.getOrDefault("cod", ""), fontePadrao));
                }
                document.add(tablePecas);
            }

            // === 4. RELATÓRIO TÉCNICO ===
            document.add(new Paragraph("3. Relatório Técnico da Atividade", fonteNegrito));
            Paragraph rel = new Paragraph(relatorio, fontePadrao);
            rel.setSpacingBefore(5);
            rel.setSpacingAfter(30); // Dá um bom espaço antes das assinaturas
            document.add(rel);

            // === 4. ASSINATURAS (A Mágica da Tabela Transparente) ===
            // Tabela com 2 colunas, sem bordas
            PdfPTable tableAssinaturas = new PdfPTable(2);
            tableAssinaturas.setWidthPercentage(100);
            tableAssinaturas.setSpacingBefore(50); // Empurra as assinaturas mais pra baixo

            // Pegando os nomes dos usuários com segurança
            String nomeTecnico = (os.getUserLow() != null && os.getUserLow().getNomeCompleto() != null)
                    ? os.getUserLow().getNomeCompleto()
                    : "Técnico Responsável";

            String nomeSupervisor = (os.getUserMedium() != null && os.getUserMedium().getNomeCompleto() != null)
                    ? os.getUserMedium().getNomeCompleto()
                    : "Supervisor de Manutenção";

            // Célula 1: Técnico
            PdfPCell cellTecnico = new PdfPCell();
            cellTecnico.setBorder(Rectangle.NO_BORDER);
            cellTecnico.setHorizontalAlignment(Element.ALIGN_CENTER);

            Paragraph linhaTecnico = new Paragraph("_______________________________________", fontePadrao);
            linhaTecnico.setAlignment(Element.ALIGN_CENTER);
            Paragraph pTecnico = new Paragraph(nomeTecnico, fonteNegrito);
            pTecnico.setAlignment(Element.ALIGN_CENTER);
            Paragraph cargoTecnico = new Paragraph("Técnico de Manutenção", fontePequena);
            cargoTecnico.setAlignment(Element.ALIGN_CENTER);

            cellTecnico.addElement(linhaTecnico);
            cellTecnico.addElement(pTecnico);
            cellTecnico.addElement(cargoTecnico);

            // Célula 2: Supervisor
            PdfPCell cellSupervisor = new PdfPCell();
            cellSupervisor.setBorder(Rectangle.NO_BORDER);
            cellSupervisor.setHorizontalAlignment(Element.ALIGN_CENTER);

            Paragraph linhaSupervisor = new Paragraph("_______________________________________", fontePadrao);
            linhaSupervisor.setAlignment(Element.ALIGN_CENTER);
            Paragraph pSupervisor = new Paragraph(nomeSupervisor, fonteNegrito);
            pSupervisor.setAlignment(Element.ALIGN_CENTER);
            Paragraph cargoSupervisor = new Paragraph("Supervisor / Gestor", fontePequena);
            cargoSupervisor.setAlignment(Element.ALIGN_CENTER);

            cellSupervisor.addElement(linhaSupervisor);
            cellSupervisor.addElement(pSupervisor);
            cellSupervisor.addElement(cargoSupervisor);

            // Adiciona as células na tabela e a tabela no documento
            tableAssinaturas.addCell(cellTecnico);
            tableAssinaturas.addCell(cellSupervisor);
            document.add(tableAssinaturas);

            // Fechamento
            document.close();

        } catch (Exception e) {
            System.err.println("🔥 ERRO FATAL AO GERAR O PDF DA OS:");
            e.printStackTrace();
            throw new RuntimeException("Erro ao gerar o PDF", e);
        }

        return outputStream.toByteArray();
    }
}