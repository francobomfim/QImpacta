import { EnadeItem } from '../types/enade';

export function exportItemAsJSON(item: EnadeItem): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(item, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `item-enade-${item.courseId.toLowerCase()}-${item.id}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportMultipleItemsAsJSON(items: EnadeItem[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `banco-questoes-enade-${items.length}-itens.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportItemAsMarkdown(item: EnadeItem): void {
  const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(item.rawMarkdown);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `item-enade-${item.courseId.toLowerCase()}-${item.id}.md`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportItemAsLaTeX(item: EnadeItem): void {
  const latexContent = `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[brazil]{babel}
\\usepackage{amsmath,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{geometry}
\\geometry{margin=2.5cm}

\\title{Banco de Itens e Avaliação ENADE -- Faculdade Impacta\\\\\\large ${item.courseName} (${item.ordinance})}
\author{Faculdade Impacta -- Coordenação de Tecnologia e Computação}
\date{\today}

\begin{document}
\maketitle

\section*{Metadados da Matriz 3D}
\begin{itemize}
  \item \textbf{Curso:} ${item.courseName} (${item.ordinance})
  \item \textbf{Eixo X (Perfil do Concluinte):} ${item.selectedX.join('; ')}
  \item \textbf{Eixo Y (Habilidades):} ${item.selectedY.join('; ')}
  \item \textbf{Eixo Z (Objetos de Conhecimento):} ${item.selectedZ.join('; ')}
  \item \textbf{Tipo:} ${item.questionType}
\end{itemize}

\vspace{0.5cm}
\hrule
\vspace{0.5cm}

\section*{Questão}
${escapeLatex(item.rawMarkdown)}

\end{document}
`;

  const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(latexContent);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `item-enade-${item.courseId.toLowerCase()}-${item.id}.tex`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportItemAsDOCX(item: EnadeItem): void {
  // Generates Word-compatible HTML file that Microsoft Word / LibreOffice opens seamlessly as .doc / .docx
  const htmlContent = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta charset="utf-8">
<title>Item ENADE - Faculdade Impacta - ${item.courseName}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #111; margin: 40px; }
  h1 { font-size: 16pt; color: #003366; text-align: center; border-bottom: 2px solid #003366; padding-bottom: 8px; }
  h2 { font-size: 13pt; color: #003366; margin-top: 20px; }
  h3 { font-size: 11pt; color: #333; margin-top: 15px; }
  .header-box { background: #f0f4f8; border: 1px solid #d0d7de; padding: 12px; margin-bottom: 20px; border-radius: 4px; }
  .metadata-title { font-weight: bold; color: #003366; }
  table { border-collapse: collapse; width: 100%; margin: 15px 0; }
  th, td { border: 1px solid #333; padding: 8px; text-align: left; }
  th { background-color: #e6edf2; }
  pre { background: #f6f8fa; border: 1px solid #ddd; padding: 10px; font-family: Consolas, monospace; }
</style>
</head>
<body>
  <div style="text-align: center; margin-bottom: 15px;">
    <strong>FACULDADE IMPACTA</strong><br>
    <strong>CURSOS DE GRADUAÇÃO E TECNOLOGIA EM TI</strong><br>
    <em>SISTEMA DE AVALIAÇÃO ACADÊMICA E BANCO DE ITENS ENADE</em>
  </div>

  <h1>${item.courseName}</h1>
  <div class="header-box">
    <p><strong>Referencial / Portaria:</strong> ${item.ordinance}</p>
    <p><strong>Eixo X (Perfil):</strong> ${item.selectedX.join(' | ')}</p>
    <p><strong>Eixo Y (Habilidades):</strong> ${item.selectedY.join(' | ')}</p>
    <p><strong>Eixo Z (Objetos de Conhecimento):</strong> ${item.selectedZ.join(' | ')}</p>
    <p><strong>Tipo de Questão:</strong> ${item.questionType}</p>
  </div>

  <div>
    ${convertMarkdownToBasicHtml(item.rawMarkdown)}
  </div>
</body>
</html>`;

  const blob = new Blob(['\ufeff' + htmlContent], {
    type: 'application/msword'
  });
  const url = URL.createObjectURL(blob);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', url);
  downloadAnchor.setAttribute('download', `item-enade-${item.courseId.toLowerCase()}-${item.id}.doc`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  URL.revokeObjectURL(url);
}

export function printOfficialEnadeSheet(item: EnadeItem): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Caderno de Avaliação ENADE - Faculdade Impacta - ${item.courseName}</title>
      <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.4; color: #000; padding: 20px; max-width: 800px; mx: auto; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { font-size: 14pt; margin: 2px 0; text-transform: uppercase; font-weight: bold; }
        .header h2 { font-size: 12pt; margin: 2px 0; font-weight: normal; }
        .meta-box { font-size: 10pt; background: #f8f9fa; border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; }
        .content { white-space: pre-wrap; font-family: inherit; font-size: 11pt; }
        table { border-collapse: collapse; width: 100%; margin: 10px 0; }
        th, td { border: 1px solid #000; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Faculdade Impacta</h1>
        <h2>Coordenação de Graduação • Cursos de Tecnologia e Computação</h2>
        <h2>Avaliação Formativa e Preparatória ENADE</h2>
        <h3>${item.courseName.toUpperCase()} -- ${item.ordinance}</h3>
      </div>
      <div class="content">${item.rawMarkdown.replace(/###/g, '').replace(/---/g, '<hr/>')}</div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function escapeLatex(text: string): string {
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/#/g, '\\#')
    .replace(/%/g, '\\%')
    .replace(/&/g, '\\&')
    .replace(/_/g, '\\_');
}

function convertMarkdownToBasicHtml(md: string): string {
  return md
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/---/g, '<hr>');
}
