fetch("https://github.com/Crlziito04/codoAcodo/script/data.js")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // Procesamiento de la info que llega de la API
    console.log(data, "********");
  })
  .catch(error => console.log("Ocurrió un error! " + error));
