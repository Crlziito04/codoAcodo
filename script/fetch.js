const containerProductos = document.getElementById("containerProductos");
const editFormContainer = document.getElementById("editFormContainer");
const reset = document.getElementById("reset");
// reset.addEventListener("click", async () => {
//   window.location.reload(true);
// })

window.addEventListener("DOMContentLoaded", (event) => {
  const el = document.getElementById("overlayBtn");
  if (el) {
    el.addEventListener("click", swapper, false);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const showFormBtn = document.getElementById("showFormBtn");
  const formContainer = document.getElementById("formContainer");
  const addProductForm = document.getElementById("addProductForm");
  const editProductForm = document.getElementById("editProductForm");
  const searchBtn = document.getElementById("searchBtn");
  searchBtn.innerHTML = '<i class="fas fa-search"></i> Buscar';

  const inputSearch = document.getElementById("searchProduct");

  searchBtn.addEventListener("click", async () => {
    const productName = inputSearch.value;
    await searchProductByName(productName);
  });

  showFormBtn.addEventListener("click", () => {
    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
  });

  editProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editProductId").value
    const editedProduct = {
      productName: document.getElementById("editProductName").value,
      productDetails: document.getElementById("editProductDetails").value,
      productPrice: document.getElementById("editProductPrice").value,
      productStock: document.getElementById("editProductStock").value
    };
    await updateProduct(editedProduct, id);
  });

  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newProduct = {
      productName: document.getElementById("productName").value,
      productDetails: document.getElementById("productDetails").value,
      productPrice: document.getElementById("productPrice").value,
      productStock: document.getElementById("productStock").value,
    };
    await addProduct(newProduct);
  });

  fetch("http://localhost:5000/api/products/active/")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderProductos(data);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
});

const renderProductos = (data) => {
  containerProductos.innerHTML = "";

  const table = document.createElement("table");
  const headerRow = table.insertRow();

  // Agregar encabezados de la tabla
  const headers = ["Nombre", "Detalles", "Precio", "Stock", "Acciones"];
  headers.forEach((headerText) => {
    const header = document.createElement("th");
    const textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  // Agregar filas de la tabla con los datos de los productos
  data.forEach((item) => {
    const row = table.insertRow();
    row.insertCell().appendChild(document.createTextNode(item.productName));
    row.insertCell().appendChild(document.createTextNode(item.productDetails));
    row
      .insertCell()
      .appendChild(document.createTextNode(item.productPrice + " ARS"));
    row
      .insertCell()
      .appendChild(document.createTextNode(item.productStock + " Uni"));

    const actionCell = row.insertCell();

    const editBtn = document.createElement("button");
    editBtn.className = "editBtn button";
    editBtn.setAttribute("data-id", item.id);
    editBtn.type = "button";
    editBtn.innerText = "Editar";
    actionCell.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn button";
    deleteBtn.setAttribute("data-id", item.id);
    deleteBtn.type = "button";
    deleteBtn.innerText = "Eliminar";
    actionCell.appendChild(deleteBtn);
  });

  containerProductos.appendChild(table);

  // Event listeners para los botones de Editar y Eliminar
  const editBtns = containerProductos.querySelectorAll(".editBtn");
  editBtns.forEach((editBtn) => {
    editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i> Editar';
  });
  const deleteBtns = containerProductos.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
  });

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      const itemId = e.currentTarget.getAttribute("data-id");
      const product = data.find((p) => p.id === parseInt(itemId));
      document.getElementById("editProductId").value = product.id;
      document.getElementById("editProductName").value = product.productName;
      document.getElementById("editProductDetails").value =
        product.productDetails;
      document.getElementById("editProductPrice").value = product.productPrice;
      document.getElementById("editProductStock").value = product.productStock;
      // editFormContainer.style.display = "block";
      editFormContainer.style.display = editFormContainer.style.display === "none" ? "block" : "none";
    });
  });

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", async (e) => {
      console.log(e);
      const itemId = e.currentTarget.getAttribute("data-id");
      await deleteProduct(itemId);
    });
  });
};