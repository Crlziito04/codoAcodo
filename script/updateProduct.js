const updateProduct = async (product, id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/product/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Error al agregar el producto');
    }
    const data = await response.json();
    alert(data)
    window.location.reload(true);
  } catch (error) {
    alert(error.message);
  }
};