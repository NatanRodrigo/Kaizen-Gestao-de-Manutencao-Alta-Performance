import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function OrdemServicoPdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [];
    const details = [];
    const footer = [];

    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],

        header: [reportTitle],
        content: [details],
        footer: [footer],
    }

    pdfMake.createPdf(docDefinition).download();
}

export default OrdemServicoPdf;