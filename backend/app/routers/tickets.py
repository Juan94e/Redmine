from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import Ticket  # Importar el modelo ticket
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
@router.get("/tickets")
def get_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()  # Obtener todos los tickets de la tabla
    return tickets