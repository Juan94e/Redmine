from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from ..models import Archivo, Ticket
from ..database import get_db
from datetime import datetime
import os

router = APIRouter()

# Configuración para almacenar archivos
UPLOAD_DIR = "uploads"  # Carpeta donde se guardarán los archivos
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Endpoint para subir un archivo a un ticket
@router.post("/tickets/{ticket_id}/archivos")
async def subir_archivo(
    ticket_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Verificar si el ticket existe
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Guardar el archivo en el servidor
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Crear el registro del archivo en la base de datos
    db_archivo = Archivo(
        ticket_id=ticket_id,
        nombre_archivo=file.filename,
        ruta_archivo=file_path,
        fecha_subida=datetime.utcnow()
    )
    db.add(db_archivo)
    db.commit()
    db.refresh(db_archivo)

    return {"mensaje": "Archivo subido correctamente", "archivo": db_archivo}

# Endpoint para obtener los archivos de un ticket
@router.get("/tickets/{ticket_id}/archivos")
def obtener_archivos(
    ticket_id: int,
    db: Session = Depends(get_db)
):
    # Verificar si el ticket existe
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket no encontrado")

    # Obtener los archivos asociados al ticket
    archivos = db.query(Archivo).filter(Archivo.ticket_id == ticket_id).all()
    return archivos

# Endpoint para descargar un archivo
@router.get("/archivos/{archivo_id}")
def descargar_archivo(
    archivo_id: int,
    db: Session = Depends(get_db)
):
    # Obtener el archivo de la base de datos
    archivo = db.query(Archivo).filter(Archivo.id == archivo_id).first()
    if not archivo:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")

    # Verificar si el archivo existe en el servidor
    if not os.path.exists(archivo.ruta_archivo):
        raise HTTPException(status_code=404, detail="Archivo no encontrado en el servidor")

    # Devolver el archivo como una respuesta de descarga
    from fastapi.responses import FileResponse
    return FileResponse(archivo.ruta_archivo, filename=archivo.nombre_archivo)