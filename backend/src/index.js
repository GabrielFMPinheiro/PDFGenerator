const express = require("express");
const cors = require("cors");
const { createPDF } = require("./services/createPDF");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());
// Pasta onde ficarão os arquivos estáticos, como fotos
app.use(express.static("public"));

app.post("/generate-pdf", async (req, res) => {
  const FILE_PATH = path.join(__dirname, "/example.ejs");
  const pdfBuffer = await createPDF(FILE_PATH, { ...req.body });

  // Iremos setar o header com o tipo de arquivo enviado
  res.setHeader("Content-Type", "application/pdf");
  // Por fim, enviar o arquivo
  res.end(pdfBuffer);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
