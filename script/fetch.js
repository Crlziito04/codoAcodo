const containerProductos = document.getElementById("containerProductos");
const editFormContainer = document.getElementById("editFormContainer");
const reset = document.getElementById("reset");
reset.addEventListener("click", async () => {
  window.location.reload(true);
})

document.addEventListener("DOMContentLoaded", () => {
  const showFormBtn = document.getElementById("showFormBtn");
  const formContainer = document.getElementById("formContainer");
  const addProductForm = document.getElementById("addProductForm");
  const editProductForm = document.getElementById("editProductForm");
  const searchBtn = document.getElementById("searchBtn");
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
      productStock: document.getElementById("productStock").value
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
  containerProductos.innerHTML = '';
  data.forEach(item => {
    const article = document.createElement('article');
    article.innerHTML = `
          <h3>${item.productName}</h3>
        <p>${item.productDetails}</p>
        <p>${item.productPrice} ARS</p>
        <p>${item.productStock} Uni</p>
        <button class="editBtn" data-id="${item.id}" type="button">Editar</button>
        <button class="deleteBtn" data-id="${item.id}" type="button" class="button">Eliminar</button>`;
    containerProductos.appendChild(article);
  });
  const editBtns = containerProductos.querySelectorAll(".editBtn");
  const deleteBtns = containerProductos.querySelectorAll(".deleteBtn");

  editBtns.forEach(editBtn => {
    editBtn.addEventListener("click", (e) => {
      const itemId = e.currentTarget.getAttribute("data-id");
      const product = data.find(p => p.id === parseInt(itemId));
      document.getElementById("editProductId").value = product.id;
      document.getElementById("editProductName").value = product.productName;
      document.getElementById("editProductDetails").value = product.productDetails;
      document.getElementById("editProductPrice").value = product.productPrice;
      document.getElementById("editProductStock").value = product.productStock;
      editFormContainer.style.display = "block";
    });
  });

  deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener("click", async (e) => {
      console.log(e)
      const itemId = e.currentTarget.getAttribute("data-id");
      await deleteProduct(itemId);
    });
  });
};