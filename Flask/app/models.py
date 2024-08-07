from app.database import get_db

class Product:
    def __init__(self, id_product=None, productName=None, productDetails=None, productPrice=None, productStock=None, productBrand=None):
        self.id_product = id_product
        self.productName = productName
        self.productDetails = productDetails
        self.productPrice = productPrice
        self.productStock = productStock
        

    @staticmethod
    def __get_products_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
    
        products = []
        for row in rows:
            products.append(
                Product(
                    id_product=row[0],
                    productName=row[1],
                    productDetails=row[2],
                    productPrice=row[3],
                    productStock=row[4]
                )
            )
        cursor.close()
        return products

    @staticmethod
    def get_all_active():
        return Product.__get_products_by_query(
            """
                SELECT * 
                FROM product
            """
        )

    @staticmethod
    def get_all_archived():
        return Product.__get_products_by_query(
            """
                SELECT * 
                FROM product 
                WHERE active = false
            """
        ) 
    
    @staticmethod
    def get_by_id(id_product):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM product WHERE id = %s", (id_product,))

        row = cursor.fetchone()
        cursor.close()

        if row:
            return Product(
                id_product=row[0],
                productName=row[1],
                productDetails=row[2],
                productPrice=row[3],
                productStock=row[4]
            )
        return None
    
    @staticmethod
    def get_by_name(productName):
      db = get_db()
      cursor = db.cursor()
      cursor.execute("SELECT * FROM product WHERE LOWER(productname) = LOWER(%s)", (productName,))
    
      row = cursor.fetchone()
      cursor.close()

      if row:
        return Product(
            id_product=row[0],
            productName=row[1],
            productDetails=row[2],
            productPrice=row[3],
            productStock=row[4]
        )
      return None

    
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_product: # Actualizar Producto existente
            cursor.execute(
                """
                UPDATE product
                SET productName = %s, productDetails = %s, productPrice = %s, productStock = %s
                WHERE id = %s
                """,
                (self.productName, self.productDetails, self.productPrice, self.productStock, self.id_product))
        else: # Crear Produto nuevo
            cursor.execute(
                """
                INSERT INTO product
                (productName, productDetails, productPrice, productStock)
                VALUES (%s, %s, %s, %s)
                """,
                (self.productName, self.productDetails, self.productPrice, self.productStock))
            self.id_product = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM product WHERE id = %s", (self.id_product,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id_product,
            'productName': self.productName,
            'productDetails': self.productDetails,
            'productPrice': self.productPrice,
            'productStock': self.productStock
        }