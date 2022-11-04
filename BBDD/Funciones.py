
import pyodbc

conexion = pyodbc.connect(r'Driver=SQL Server;Server=.\SOFT2_BBDD;Database=SOFT;Trusted_Connection=yes;')


#DESCONECTAR BBDD
def desconectarBBDD():
    conexion.close()

#CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA
#ALTA USUARIO (FALTA)
def altaUsuario(CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA):
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO T_USUARIO (CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA) VALUES('" + CORREO + "','" + NOMBRE_USUARIO + "','"+ CONTRASENA +"','"+ FOTO +"','"+ FECHA_NACIMIENTO +"','"+NOMBRE +"','"+APELLIDOS +"','"+DESCRIPCION +"','"+PROCEDENCIA + "')")
    row = cursor.fetchone()
    if not row:
        usr = None
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr



#LOGIN USUARIO -(modificar campos vacios)
def login(NOMBRE_USUARIO,PWD):
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO ='" +NOMBRE_USUARIO+ "' AND CONTRASENA = '"+ PWD + "'")
    row = cursor.fetchone()
    if not row:
        usr = None
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr

#modifica un campo entre CORREO, NOMBRE_USUARIO, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION o PROCEDENCIA al usuario con Nombre de usuario NOMBRE_USUARIO y
#lo modifica a MODIFICACION
#MODIFICAR USUARIO
def modificar_usuario(NOMBRE_USUARIO,CAMPO,MODIFICACION):
    cursor = conexion.cursor()
    NOMBRE_USUARIO_MODIFICADO = NOMBRE_USUARIO
    MODIFICACION_MOD = MODIFICACION
    if CAMPO == "NOMBRE_USUARIO":
        NOMBRE_USUARIO_MODIFICADO = MODIFICACION
    cursor.execute("UPDATE T_USUARIO SET "+CAMPO+" = '" + MODIFICACION +"' WHERE NOMBRE_USUARIO ='" +NOMBRE_USUARIO+ "'")
    conexion.commit()
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO ='" +NOMBRE_USUARIO_MODIFICADO + "'")
    row = cursor.fetchone()
    if not row:
        usr = [None,None,None,None,None,None,None,None,None]
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr


#RECUPERAR CONTRASENA
def recuperar_pwd(CORREO):
    cursor = conexion.cursor()
    cursor.execute("SELECT CONTRASENA FROM T_USUARIO WHERE CORREO ='" +CORREO+ "'")
    row = cursor.fetchone()
    if not row:
        pwd = [None]
        return pwd
    else:
        pwd = [row.CONTRASENA]
        return pwd

#DESPLIEGUE HOME -todo
def despliegue_home(NOMBRE_USUARIO):
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO ='" +NOMBRE_USUARIO+ "'")
    row = cursor.fetchone()
    if not row:
        usr = [None,None,None,None,None,None,None,None,None]
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr

#ESTADISTICAS - todo (
def estadisticas(NOMBRE_USUARIO):
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO ='" +NOMBRE_USUARIO+ "'")
    row = cursor.fetchone()
    if not row:
        usr = [None,None,None,None,None,None,None,None,None]
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr

#LISTA DE COMIDAS FAVORITAS - todo
def lista_comidas_fav(NOMBRE_USUARIO):
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO ='" +NOMBRE_USUARIO+ "'")
    row = cursor.fetchone()
    if not row:
        usr = [None,None,None,None,None,None,None,None,None]
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr


print(login("Gato_azul_purpurina","12345"))
print(recuperar_pwd("GATO@hotmail.COM"))
print(modificar_usuario("Gato_azul_purpurina","DESCRIPCION","BUENOS DIAS MUNDO"))

desconectarBBDD()