from flask import Flask
from flask_cors import CORS

from app.views import *
from app.database import *


app = Flask(__name__)

# Rutas de API-Rest
app.route('/', methods=['GET'])(index)

#Conexión a BDD
test_connection()



#CRUD
app.route('/api/products/active/', methods=['GET'])(get_products_active)
app.route('/api/products/archived/', methods=['GET'])(get_products_archived)

app.route('/api/products/fetch/<int:product_id>', methods=['GET'])(get_product)

app.route('/api/products/create/', methods=['POST'])(create_product)
app.route('/api/products/update/<int:product_id>', methods=['PUT'])(update_product)

app.route('/api/products/archived/<int:product_id>', methods=['DELETE'])(archive_product)

create_table_product()

# Inicializar la base de datos con la aplicación Flask
# Conexión a BDD
init_app(app)

#permitir solicitudes desde cualquier origen
# Cors
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
