// Contenedor donde se dibujan las tareas
let productList = document.querySelector(".product-list");
console.log(productList);
// Template de tarea Pendiente
let productActiveTemplateReference = document.querySelector(
  ".producto.activo.template"
);

// Template de tarea Archivada
let productArchivedTemplateReference = document.querySelector(
  ".producto.archivado.template"
);

let activeProduct = productActiveTemplateReference.cloneNode(true);
let archivedProduct = productArchivedTemplateReference.cloneNode(true);

// Quito del documento los templates
productActiveTemplateReference.remove();
productArchivedTemplateReference.remove();

fetchData("http://localhost:5000/api/products/active/", "GET", (data) => {
  console.log(data);

  let products = [];

  // Recorro la lista de tareas obtenidas
  for (const product of data) {
    console.log(product);

    // Duplico la plantilla de tarea pendiente
    let newProduct = activeProduct.cloneNode(true);

    // Completo la tarea nueva con los datos reales
      newProduct.querySelector("h3 .nombre").innerHTML = product.productName;
      newProduct.querySelector(".detalle").innerHTML = product.productDetails;
      newProduct.querySelector(".precio").innerHTML = product.productPrice;
      newProduct.querySelector(".stock").innerHTML = product.productStock;
      newProduct.querySelector(".id_product").value = product.id;

    // Agrego la nueva tarea al listado de tareas para ver en el viewport
    products.push(newProduct);
  }

  // Accion doble:
  // ReplaceChildren borra todo el contenido interno y agrega lo que yo le diga
  productList.replaceChildren(...products);
});