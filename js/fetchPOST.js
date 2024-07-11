let submitButton = document.querySelector("#Formulario #Crear");

submitButton.addEventListener("click", () => {
  let data_post = {
    productName: document.querySelector("#Formulario #Nombre").value,
    productDetails: document.querySelector("#Formulario #Descripcion").value,
    productPrice: document.querySelector("#Formulario #Precio").value,
    productStock: document.querySelector("#Formulario #Stock").value,
  };

  fetchData(
    "http://localhost:5000/api/tasks/create/",
    "POST",
    (data) => {
      document.querySelector("#Formulario").reset();
      window.location.replace("../index.html#TareasPendientes");
    },
    data_post
  );
});
