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

  fetch("https://crlziito04.github.io/codoAcodo/data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      renderProductos(data);
    })
    .catch(error => console.log("Ocurrió un error! " + error));
});