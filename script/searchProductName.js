const searchProductByName = async (productName) => {
  try {
    await fetch(`http://localhost:5000/api/products/fetch/${productName}`).then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    }).then(data => {
      renderProductos([data]);
    })
  } catch (error) {
    alert(error.message);
  }
};