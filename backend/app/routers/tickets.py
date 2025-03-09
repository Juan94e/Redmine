from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import Ticket, User, TicketUpdate  # Importar los modelos Ticket y User
from ..database import get_db  # Importar la función get_db
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

# Modelo Pydantic para la creación de tickets
class TicketCreate(BaseModel):
    titulo: str
    descripcion: str
    cliente_id: int
    tecnico_id: int | None = None  # El técnico puede ser opcional al crear el ticket

# Modelo Pydantic para la respuesta de tickets
class TicketResponse(BaseModel):
    id: int
    titulo: str
    descripcion: str
    estado: str
    cliente_id: int
    tecnico_id: int | None
    fecha_creacion: datetime
    fecha_actualizacion: datetime

# Nuevo modelo Pydantic para actualizaciones
class TicketUpdateCreate(BaseModel):
    contenido: str
    user_id: int

# Endpoint para obtener todos los tickets
@router.get("/tickets", response_model=List[TicketResponse])
def get_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()  # Obtener todos los tickets de la tabla
    return tickets

# Endpoint para crear un nuevo ticket
@router.post("/tickets", response_model=TicketResponse)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    # Verificar si el cliente existe
    cliente = db.query(User).filter(User.id == ticket.cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    # Verificar si el técnico existe (si se proporcionó)
    if ticket.tecnico_id:
        tecnico = db.query(User).filter(User.id == ticket.tecnico_id).first()
        if not tecnico:
            raise HTTPException(status_code=404, detail="Técnico no encontrado")

    # Crear el ticket
    db_ticket = Ticket(
        titulo=ticket.titulo,
        descripcion=ticket.descripcion,
        cliente_id=ticket.cliente_id,
        tecnico_id=ticket.tecnico_id,
        estado="abierto"  # Estado por defecto
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

# Nuevo endpoint para agregar actualizaciones
@router.post("/tickets/{ticket_id}/updates")
def add_ticket_update(
    ticket_id: int,
    update: TicketUpdateCreate,
    db: Session = Depends(get_db)
):
    # Verificar si el ticket existe
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Verificar si el usuario existe
    user = db.query(User).filter(User.id == update.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    new_update = TicketUpdate(
        ticket_id=ticket_id,
        user_id=update.user_id,  
        contenido=update.contenido
    )
    db.add(new_update)
    db.commit()
    db.refresh(new_update) # Opcional: para obtener el objeto actualizado
    return {"mensaje": "Actualización agregada correctamente"}


# Endpoint para obtener un ticket por ID
@router.get("/tickets/{ticket_id}", response_model=TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")
    return ticket

# Endpoint para actualizar un ticket
@router.put("/tickets/{ticket_id}", response_model=TicketResponse)
def update_ticket(ticket_id: int, ticket: TicketCreate, db: Session = Depends(get_db)):
    # Obtener el ticket existente
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not db_ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Verificar si el cliente existe
    cliente = db.query(User).filter(User.id == ticket.cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    # Verificar si el técnico existe (si se proporcionó)
    if ticket.tecnico_id:
        tecnico = db.query(User).filter(User.id == ticket.tecnico_id).first()
        if not tecnico:
            raise HTTPException(status_code=404, detail="Técnico no encontrado")

    # Actualizar los campos del ticket
    db_ticket.titulo = ticket.titulo
    db_ticket.descripcion = ticket.descripcion
    db_ticket.cliente_id = ticket.cliente_id
    db_ticket.tecnico_id = ticket.tecnico_id

    db.commit()
    db.refresh(db_ticket)
    return db_ticket

# Endpoint para eliminar un ticket
@router.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    # Obtener el ticket existente
    db_ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not db_ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Eliminar el ticket
    db.delete(db_ticket)
    db.commit()
    return {"mensaje": "Ticket eliminado correctamente"}

    