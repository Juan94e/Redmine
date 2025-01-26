from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import User  # Importar el modelo User
from ..database import SessionLocal  # Importar la sesión de la base de datos

router = APIRouter()

# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para obtener todos los usuarios
@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()  # Obtener todos los usuarios de la tabla
    return users