

import pyodbc

conexion = pyodbc.connect(r'Driver=SQL Server;Server=.\SOFT2_BBDD;Database=SOFT;Trusted_Connection=yes;')
print("prueba")

#DESCONECTAR BBDD
def desconectarBBDD():
    conexion.close()

#CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA
#ALTA USUARIO 
def altaUsuario(CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA):
    cursor = conexion.cursor()
    CORREO = "'" + CORREO + "'"
    NOMBRE_USUARIO = "'" + NOMBRE_USUARIO + "'"
    CONTRASENA = "'" + CONTRASENA + "'"
    FOTO = "'" + FOTO + "'"
    FECHA_NACIMIENTO = "'" + FECHA_NACIMIENTO + "'"
    NOMBRE = "'" + NOMBRE + "'"
    APELLIDOS = "'" + APELLIDOS + "'"
    DESCRIPCION = "'" + DESCRIPCION + "'"
    PROCEDENCIA = "'" + PROCEDENCIA + "'"
    print(CORREO)
    if NOMBRE == "''":
        NOMBRE = "Null"
    if APELLIDOS == "''":
        APELLIDOS = "Null"
    if PROCEDENCIA == "''":
        PROCEDENCIA = "Null"
    if DESCRIPCION == "''":
        DESCRIPCION = "Null"
    if FOTO == "":
        FOTO = "Null"
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO = " + NOMBRE_USUARIO)
    row = cursor.fetchone()
    if row:
        usr = None
        return usr
    cursor.execute("INSERT INTO T_USUARIO (CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA) VALUES(" + CORREO + "," + NOMBRE_USUARIO + ","+ CONTRASENA +","+ FOTO +","+ FECHA_NACIMIENTO +","+NOMBRE +","+APELLIDOS +","+DESCRIPCION +","+ PROCEDENCIA + ")")
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO = " + NOMBRE_USUARIO)
    row = cursor.fetchone()
    if not row:
        usr = None
        return usr
    else:
        usr = [row.CORREO,row.NOMBRE_USUARIO,row.CONTRASENA,row.FOTO,row.FECHA_NACIMIENTO,row.NOMBRE,row.APELLIDOS,row.DESCRIPCION,row.PROCEDENCIA]
        return usr



#LOGIN USUARIO
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
#MODIFICAR USUARIO (Caso modifiacion a un 
def modificar_usuario(NOMBRE_USUARIO,CAMPO,MODIFICACION):
    cursor = conexion.cursor()
    if MODIFICACION == '':
        MODIFICACION = "Null"
    NOMBRE_USUARIO_MODIFICADO = "'" + NOMBRE_USUARIO + "'"
    if CAMPO == "NOMBRE_USUARIO":
        NOMBRE_USUARIO_MODIFICADO = "'" +MODIFICACION+"'"
    MODIFICACION = "'" + MODIFICACION + "'"
    NOMBRE_USUARIO = "'" + NOMBRE_USUARIO + "'"
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO = " + NOMBRE_USUARIO)
    row = cursor.fetchone()
    if not row:
        usr = None
        return usr
    cursor.execute("UPDATE T_USUARIO SET "+CAMPO+" = " + MODIFICACION +" WHERE NOMBRE_USUARIO = " +NOMBRE_USUARIO)
    conexion.commit()
    cursor.execute("SELECT * FROM T_USUARIO WHERE NOMBRE_USUARIO =" +NOMBRE_USUARIO_MODIFICADO)
    row = cursor.fetchone()
    if not row:
        usr = None
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
        pwd = None
        return pwd
    else:
        pwd = [row.CONTRASENA]
        return pwd


#ESTADISTICAS
#[[número de degustaciones][[local nuevo 1][local nuevo 2][local nuevo 3]...]]
def estadisticas(NOMBRE_USUARIO):
    cursor = conexion.cursor()
    cursor.execute("SELECT COUNT(ID_DEGUSTACION) AS NUM FROM T_DEGUSTA WHERE NOMBRE_USUARIO = '"+NOMBRE_USUARIO+"'")
    row = cursor.fetchone()
    array = [row.NUM]
    cursor.execute("SELECT * FROM T_LOCAL WHERE FECHA_AGREGA = '7dias'")
    row = cursor.fetchone()
    array2 = []
    while row:
        arrayAux = [row.NOMBRE, row.COORDENADAS, row.DIRECCION, row.AGREGA, row.FECHA_AGREGA]
        array2.append(arrayAux)
        row = cursor.fetchone()
    array.append(array2)
    return array

#LISTA DE COMIDAS FAVORITAS - todo
def lista_comidas_fav(NOMBRE_USUARIO):
    cursor = conexion.cursor()
    cursor.execute("SELECT * FROM T_TIENE_FAVORITOS F INNER JOIN T_DEGUSTACION D ON(F.ID_DEGUSTACION = D.ID_DEGUSTACION)WHERE  NOMBRE_USUARIO = '"+NOMBRE_USUARIO+"'")
    row = cursor.fetchone()
    array = []
    while row:
        arrayAux = [row.ID_DEGUSTACION, row.NOMBRE, row.CALIFICADOR, row.TIPO, row.FOTO, row.REGION,row.USUARIO_ANADE,row.LOCAL_ANADE]
        array.append(arrayAux)
        row = cursor.fetchone()
    return array


#print(altaUsuario("correo" + "@gmail.com","usuario",  "1234","foto" ,"01.01.2000","nombre","apellido","Descripcion" ,"Procedencia" ))
#print(login("usuario0001","00000001"))
#print(recuperar_pwd("corredmail.com"))
#print(modificar_usuario("usuad01","DESCRIPCION","BUENOS DIAS MUNDO"))
#print(modificar_usuario("usuad001","NOMBRE_USUARIO","gato"))
#print(estadisticas("gdo"))
#print(lista_comidas_fav("dto"))

desconectarBBDD()


