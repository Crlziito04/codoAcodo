from flask import jsonify, request
from app.models import Product

def index():
    return jsonify({'message' : 'Hello World API TODO Lists'})

def get_products_active():
    products = Product.get_all_active()
    return jsonify([product.serialize() for product in products])

def get_products_archived():
    products = Product.get_all_archived()
    return jsonify([product.serialize() for product in products])

def get_product(id_product):
    product = Product.get_by_id(id_product)
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    return jsonify(product.serialize())

def create_product():
    data = request.json
    new_product = Product(
        productName=data['productName'],
        productDetails=data['productDetails'],
        productPrice=data['productPrice'],
        productStock=data['productStock'],
        active=True
    )
    new_product.save()
    return jsonify({'message': 'Product created successfully'}), 201

def update_product(id_product):
    product = Product.get_by_id(id_product)
    if not product:
        return jsonify({'message': 'Product not found'}), 404
   
    data = request.json
    product.productName = data['productName']
    product.productDetails = data['productDetails']
    product.productPrice = data['productPrice']
    product.productStock = data['productStock']
    product.save()
    return jsonify({'message': 'Product updated successfully'})

def archive_product(id_product):
    product = Product.get_by_id(id_product)
    if not product:
        return jsonify({'message': 'Product not found'}), 404
   
    product.delete()
    return jsonify({'message': 'Product deleted successfully'})
