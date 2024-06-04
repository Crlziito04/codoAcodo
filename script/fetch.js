document.addEventListener("DOMContentLoaded", () => {
  const containerPresentacion = document.getElementById("containerProductos");

  const renderCardsPresentacion = (data) => {
    data.forEach(item => {
      const article = document.createElement('article');
      article.innerHTML = `
          <h3>${item.nombre}</h3>
        <p>${item.marca}</p>
        <p>${item.modo_de_uso}</p>
        <p>${item.precio}</p>`;
      containerPresentacion.appendChild(article);
    });
  };

  fetch("https://crlziito04.github.io/codoAcodo/data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      renderCardsPresentacion(data);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
});