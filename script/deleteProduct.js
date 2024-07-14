const deleteProduct = async (product_id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/product/delete/${product_id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }

    alert('Producto eliminado');
    window.location.reload(true);
  } catch (error) {
    alert(error.message);
  }
};