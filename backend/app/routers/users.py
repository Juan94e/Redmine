from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import User  # Importar el modelo User
from ..database import get_db  # Importar la función get_db
from pydantic import BaseModel
from typing import List
from passlib.context import CryptContext  # Importar CryptContext para hashear contraseñas

router = APIRouter()

# Configuración para hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Modelo Pydantic para la creación de usuarios
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str = "cliente"  # Rol por defecto: "cliente"

# Modelo Pydantic para la respuesta de usuarios
class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    role: str

# Endpoint para obtener todos los usuarios
@router.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()  # Obtener todos los usuarios de la tabla
    return users

# Endpoint para crear un nuevo usuario
@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    print("Datos recibidos:", user.username, user.email, user.password)  # Depuración

    # Verificar si el nombre de usuario o el correo ya existen
    db_user = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)
    ).first()
    if db_user:
        raise HTTPException(status_code=400, detail="El nombre de usuario o correo ya está en uso")

    # Hashear la contraseña antes de guardarla
    hashed_password = pwd_context.hash(user.password)
    print("Contraseña hasheada:", hashed_password)  # Depuración

    # Crear el usuario
    db_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,  # Guardar la contraseña hasheada
        role=user.role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Endpoint para obtener un usuario por ID
@router.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

# Endpoint para actualizar un usuario
@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    # Obtener el usuario existente
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Verificar si el nuevo nombre de usuario o correo ya están en uso
    if user.username != db_user.username:
        existing_user = db.query(User).filter(User.username == user.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")

    if user.email != db_user.email:
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="El correo ya está en uso")

    # Hashear la contraseña antes de guardarla
    hashed_password = pwd_context.hash(user.password)

    # Actualizar los campos del usuario
    db_user.username = user.username
    db_user.email = user.email
    db_user.password = hashed_password  # Guardar la contraseña hasheada
    db_user.role = user.role

    db.commit()
    db.refresh(db_user)
    return db_user

# Endpoint para eliminar un usuario
@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Obtener el usuario existente
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Eliminar el usuario
    db.delete(db_user)
    db.commit()
    return {"mensaje": "Usuario eliminado correctamente"}