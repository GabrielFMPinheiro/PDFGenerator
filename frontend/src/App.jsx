export default function App() {
  // Informações utilizadas nas variáveis dos arquivos .ejs
  const data = {
    name: "SEU NOME",
    references: ["https://ejs.co/", "https://github.com/mrafiqk/html-pdf-node"],
  };

  const generatePdf = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/generate-pdf", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Criando uma url de acesso as informações
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "example.pdf";
        // Necessário para funcionar em todos os browsers
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <div className="App">
      <form onSubmit={generatePdf}>
        <button type="submit">Download Here!</button>
      </form>
    </div>
  );
}
