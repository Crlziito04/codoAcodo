// Botones de filtro de productos
let filterButtons = {
    "Activos": document.querySelector("#VerActivos"),
    "Archivados": document.querySelector("#VerArchivados"),
};

// Lista donde se visualizan los productos
let productList = document.querySelector(".products-list");

// Template de producto Pendiente
let productActiveTemplateReference = document.querySelector(
    ".product.active.template"
);

// Template de producto Archivada
let productArchivedTemplateReference = document.querySelector(
    ".product.archived.template"
);


function loadProducts(product_status) {
  let fetch_data = {
    Activos: {
      URL: "http://localhost:5000/api/products/active/",
      TaskTemplatesName: "Activos",
    },

    Archivados: {
      URL: "http://localhost:5000/api/products/archived/",
      TaskTemplatesName: "Archivados",
    },
  };

  if (!(product_status in fetch_data)) {
    throw new Error(`El Parametro: ${product_status} no está definido!`);
  }

  // Templates de productos para clonar al momento de agregar productos a la lista
  let productTemplates = {
    Activos: productActiveTemplateReference.cloneNode(true),
    Archivados: productArchivedTemplateReference.cloneNode(true),
  };

  // Quito del documento los templates
  productActiveTemplateReference.remove();
  productArchivedTemplateReference.remove();

  function archiveProduct(event) {
    let id = event.currentTarget.id_product;

    let url = "http://localhost:5000/api/products/archived/" + id;

    fetchData(url, "DELETE", () => {
      location.reload();
    });
  }

  function editProduct(event) {
    let id = event.currentTarget.id_product;
    window.location.replace("../pages/abm_product.html?id_product=" + id);
  }

  fetchData(fetch_data[product_status].URL, "GET", (data) => {
    // Procesamiento de la info que llega de la API
    let products = [];
    for (const product of data) {
      let newProduct =
        productTemplates[
          fetch_data[product_status].ProductTemplatesName
        ].cloneNode(true);
      newProduct.querySelector("h3 .nombre").innerHTML = product.productName;
      newProduct.querySelector(".detalle").innerHTML = product.productDetails;
      newProduct.querySelector(".precio").innerHTML = product.productPrice;
      newProduct.querySelector(".stock").innerHTML = product.productStock;
      newProduct.querySelector(".id_product").value = product.id;

      let archivarAction = newProduct.querySelector("#Archivar");
      let editarAction = newProduct.querySelector("#Editar");

      if (archivarAction) {
        archivarAction.addEventListener("click", archiveProduct);
        archivarAction.id_product = product.id;
      }

      if (editarAction) {
        editarAction.addEventListener("click", editProduct);
        editarAction.id_product = product.id;
      }

      products.push(newProduct);
    }

    productContainer.replaceChildren(...products);
  });
}

function setActiveFilter(event) {
  for (filter in filterButtons) {
    filterButtons[filter].classList.remove("active");
  }

  event.currentTarget.classList.add("active");

  loadProducts(event.currentTarget.filterName);
}

function setFilters() {
  for (button in filterButtons) {
    filterButtons[button].addEventListener("click", setActiveFilter);
    filterButtons[button].filterName = button;
  }
}

setFilters();
loadProducts('Activos');