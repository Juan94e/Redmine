from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import users  # Importar el router de usuarios
#from .models import User, Ticket  # Importar ambos modelos

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origen de tu frontend (React)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los headers
)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Incluir el router de usuarios
#app.include_router(users.router, prefix="/api")  # Los endpoints de usuarios estarán bajo el prefijo: /api
app.include_router(users.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando correctamente"}