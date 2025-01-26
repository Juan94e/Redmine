from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:admin@localhost:5432/mydatabase"

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("¡Conexión exitosa a la base de datos!")
    connection.close()
except Exception as e:
    print("Error al conectar:", e)
