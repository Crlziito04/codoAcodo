let submitButton = document.querySelector("#Formulario #Crear");

let params = new URLSearchParams(document.location.search);
let product_id = params.get("product_id");

function add_new_product(event) {
  let data = {
    productName: document.querySelector("#Formulario #Name").value,
    productDetails: document.querySelector("#Formulario #Details").value,
    productPrice: document.querySelector("#Formulario #Price").value,
    productStock: document.querySelector("#Formulario #Stock").value,
  };

  let url = "http://localhost:5000/api/products/create/";

  fetchData(
    url,
    "POST",
    () => {
      document.querySelector("#Formulario").reset();
      window.location.replace("../index.html#ProductosActivos");
    },
    data
  );
}

function update_product(event) {
  let data = {
    productName: document.querySelector("#Formulario #Name").value,
    productDetails: document.querySelector("#Formulario #Details").value,
    productPrice: document.querySelector("#Formulario #Price").value,
    productStock: document.querySelector("#Formulario #Stock").value,
  };

  let url = "http://localhost:5000/api/products/update/" + product_id;

  fetchData(
    url,
    "PUT",
    () => {
      document.querySelector("#Formulario").reset();
      window.location.replace("../index.html#ProductosActivos");
    },
    data
  );
}

function set_form_readOnly(value) {
  let form = document.querySelector("#Formulario");
  var elements = form.elements;
  for (input of elements) {
    input.readOnly = value;
  }
}

function add_or_update() {
  if (product_id !== null) {
    document.querySelector(".actionTitle").innerHTML = "Editar producto existente";

    set_form_readOnly(true);

    let url = "http://localhost:5000/api/products/fetch/" + product_id;
    fetchData(url, "GET", (data) => {
      document.querySelector("#Name").value = data.productName;
      document.querySelector("#Details").value = data.productDetails;
      document.querySelector("#Price").value = data.productPrice;
      document.querySelector("#Stock").value = data.productStock;
      document.querySelector("#product_id").value = data.id;

      set_form_readOnly(false);
    });

    submitButton.addEventListener("click", update_product);
  } else {
    submitButton.addEventListener("click", add_new_product);
  }
}

add_or_update();
