import funciones
import pyodbc

conexion = pyodbc.connect(r'Driver=SQL Server;Server=.\SOFT2_BBDD;Database=SOFT;Trusted_Connection=yes;')


from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union


app = FastAPI()


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

class login_data(BaseModel):
    NOMBRE_USUARIO: str
    CONTRASENA: str

class Usuario(BaseModel):
    CORREO: str
    NOMBRE_USUARIO: str
    CONTRASENA: str
    FOTO: str
    FECHA_NACIMIENTO: str
    NOMBRE: str
    APELLIDOS: str
    DESCRIPCION: str
    PROCEDENCIA: str


@app.get("/{correo}/contrasena")
def api_recuperar_pwd(correo: str):
    result = {"CONTRASENA" : funciones.recuperar_pwd(correo)}
    return result

@app.get("/{nombre_usuario}/login")
def api_login(nombre_usuario : str, contrasena : str):
    result = {"USUARIO" : funciones.login(nombre_usuario,contrasena)}
    return result

@app.get("/{nombre_usuario}/estadisticas")
def api_estadisticas(nombre_usuario: str):
    result = {"ESTADISTICAS" : funciones.estadisticas(nombre_usuario)}
    return result

@app.get("/{nombre_usuario}/comidas_favoritas")
def api_lista_comidas_fav(nombre_usuario: str):
    result = {"COMIDAS_FAVORITAS" : funciones.lista_comidas_fav(nombre_usuario)}
    return result

@app.put("/{nombre_usuario}/alta")
def api_alta_usuario(nombre_usuario: str, usuario: Usuario):
    result = {"USUARIO" : funciones.altaUsuario(usuario.CORREO, usuario.NOMBRE_USUARIO, usuario.CONTRASENA, usuario.FOTO, usuario.FECHA_NACIMIENTO, usuario.NOMBRE, usuario.APELLIDOS, usuario.DESCRIPCION, usuario.PROCEDENCIA)}
    return result


@app.put("/{nombre_usuario}/modificar")
def api_modificar_usuario(nombre_usuario, campo, modificacion : str):
    result = {"USUARIO" : funciones.modificar_usuario(nombre_usuario,campo,modificacion)}
    return result
