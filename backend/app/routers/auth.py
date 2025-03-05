from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..models import User
from ..database import get_db
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

router = APIRouter()

# Configuración para JWT
SECRET_KEY = "tu_clave_secreta"  # Cambia esto por una clave segura en producción
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configuración para hashing de contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependencia para obtener el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Función para verificar la contraseña
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Función para hashear la contraseña
def get_password_hash(password):
    return pwd_context.hash(password)

# Función para autenticar al usuario
def authenticate_user(db: Session, username: str, password: str):
    print("Buscando usuario en la base de datos:", username)  # Depuración
    user = db.query(User).filter(User.username == username).first()
    if not user:
        print("Usuario no encontrado")  # Depuración
        return False
    if not verify_password(password, user.password):
        print("Contraseña incorrecta")  # Depuración
        return False
    return user

# Función para crear un token JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Endpoint para el login
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    print("Datos recibidos:", form_data.username, form_data.password)  # Depuración
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nombre de usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": user.role},  # Incluir el rol en el token
        expires_delta=access_token_expires
    )
    print("Login exitoso para el usuario:", user.username)  # Depuración
    return {"access_token": access_token,
            "token_type": "bearer",
            "role": user.role,
            "username": user.username,
            "user_id": user.id
    }  