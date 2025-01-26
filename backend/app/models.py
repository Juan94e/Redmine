from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="cliente")  # Nuevo campo: "cliente" o "tecnico"

    tickets = relationship("Ticket", back_populates="cliente")  # Relación con la tabla tickets

class Ticket(Base):
    __tablename__ = "tickets"  # Nueva tabla para los tickets

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    descripcion = Column(String)
    estado = Column(String, default="abierto")  # Estados: "abierto", "en progreso", "cerrado"
    cliente_id = Column(Integer, ForeignKey("users.id"))  # Relación con el cliente
    tecnico_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # Relación con el técnico (opcional)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)  # Fecha de creación
    fecha_actualizacion = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)  # Fecha de actualización

    cliente = relationship("User", back_populates="tickets", foreign_keys=[cliente_id])  # Relación con el cliente
    tecnico = relationship("User", foreign_keys=[tecnico_id])  # Relación con el técnico