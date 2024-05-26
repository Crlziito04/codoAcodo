const renderCardsPresentacion = (data) => {
  const containerPresentacion = document.getElementById("containerPresentacion");

  data.forEach(item => {
    const article = document.createElement('article');
    article.innerHTML = `<img
            src=${item.img}
            alt=${item.nombre}
          />
          <a href="#${item.nombre}" class="button">
                        <h2>${item.nombre}</h2>
                    </a>
                    <p>${item.description}</p>
          `
    containerPresentacion.appendChild(article);
  })
}

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