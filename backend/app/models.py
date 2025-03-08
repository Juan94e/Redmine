from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String, default="cliente")  # Nuevo campo: "cliente" o "tecnico"

    # Relación con la tabla tickets (especificando la clave foránea)
    tickets = relationship("Ticket", back_populates="cliente", foreign_keys="Ticket.cliente_id")

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, index=True)
    descripcion = Column(String)
    estado = Column(String, default="abierto")
    cliente_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    tecnico_id = Column(Integer, ForeignKey("users.id"), nullable=True) #se debe pasar bullable a true para que se asigne el tenico despues
    fecha_creacion = Column(DateTime, nullable=False, default=func.now())  # <- Agregar nullable=False
    fecha_actualizacion = Column(DateTime, nullable=False, default=func.now(), onupdate=func.now())  # <- Agregar nullable=False

    # Relaciones
    cliente = relationship("User", back_populates="tickets", foreign_keys=[cliente_id])  # Relación con el cliente
    tecnico = relationship("User", foreign_keys=[tecnico_id])  # Relación con el técnico
    archivos = relationship("Archivo", back_populates="ticket")  # Relación con archivos
    actualizaciones = relationship("TicketUpdate", back_populates="ticket")  # Nueva relación

class TicketUpdate(Base):
    __tablename__ = "ticket_updates"
    
    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    contenido = Column(String, nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
    
    ticket = relationship("Ticket", back_populates="actualizaciones")
    usuario = relationship("User")

class Archivo(Base):
    __tablename__ = "archivos"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(Integer, ForeignKey("tickets.id"), nullable=False)  # Relación con el ticket
    nombre_archivo = Column(String(255), nullable=False)  # Nombre del archivo
    ruta_archivo = Column(String(255), nullable=False)  # Ruta donde se almacena el archivo
    fecha_subida = Column(DateTime, default=datetime.utcnow)  # Fecha de subida

    ticket = relationship("Ticket", back_populates="archivos")  # Relación con el ticket