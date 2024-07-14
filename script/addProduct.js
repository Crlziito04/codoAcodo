const addProduct = async (product) => {
  console.log(product)
  try {
    const response = await fetch('http://localhost:5000/api/product/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Error al agregar el producto');
    }
    const data = await response.json();

    window.location.reload(true);
  } catch (error) {
    alert(error.message);
  }
};