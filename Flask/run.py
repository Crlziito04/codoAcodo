from flask import Flask
from flask_cors import CORS
from app.views import *
from app.database import *

app = Flask(__name__)
#permitir solicitudes desde cualquier origen

# Rutas de API-Rest
app.route('/', methods=['GET'])(index)

#Conexión a BDD
test_connection()

#CRUD
app.route('/api/products/active/', methods=['GET'])(get_products_active)
app.route('/api/products/archived/', methods=['GET'])(get_products_archived)
app.route('/api/products/fetch/<string:productName>', methods=['GET'])(get_productByName)
app.route('/api/product/create/', methods=['POST'])(create_product)
app.route('/api/product/update/<int:product_id>', methods=['PUT'])(update_product)
app.route('/api/product/delete/<int:product_id>', methods=['DELETE'])(archive_product)

create_table_product()
# Inicializar la base de datos con la aplicación Flask
# Conexión a BDD
init_app(app)
# Cors
# Configurar CORS con opciones más detalladas si es necesario
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
