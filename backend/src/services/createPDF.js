const html_to_pdf = require("html-pdf-node");
const ejs = require("ejs");

async function createPDF(file, ejsVariables) {
  let html;
  // A constante url irá ajudar caso a gente queira utilizar imagens que estão disponíveis na pasta public do backend no nosso arquivo ejs
  const url = process.env.URL || "http://localhost:3001";

  ejs.renderFile(
    // Nome do arquivo ejs que será transformado
    file,
    // Objeto contendo as váriaveis para substituir no arquivo ".ejs"
    { ...ejsVariables, url },
    (err, content) => {
      if (err) {
        throw new Error(
          "Can't render the file, probably some variables are missing"
        );
      }
      // Vamos armazenar o html após a conversão na variável html
      html = { content };
    }
  );

  // Algumas opções para o pdf que irá ser gerado. Caso precise de algo mais específico, favor consultar a documentação: https://github.com/mrafiqk/html-pdf-node
  const options = { format: "A4" };

  // Aqui será gerado o buffer do nosso pdf
  const pdfBuffer = await html_to_pdf.generatePdf(html, options);

  return pdfBuffer;
}

module.exports = {
  createPDF,
};
