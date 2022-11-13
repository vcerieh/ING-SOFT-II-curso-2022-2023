DECLARE

@V_CONT int,
@V_NUM_REGISTROS INT,
@V_CONT2 int,
@V_NUM_REGISTROS2 INT,
@V_CONT3 int,
@V_NUM_REGISTROS3 INT

SET @V_CONT = 0;
SET @V_NUM_REGISTROS = 20;
SET @V_CONT2 = 0;
SET @V_NUM_REGISTROS2 = 5;
SET @V_CONT3 = 0;
SET @V_NUM_REGISTROS3 = 3;

WHILE @V_CONT < @V_NUM_REGISTROS
BEGIN
SET @V_CONT = @V_CONT + 1


INSERT INTO T_USUARIO (CORREO, NOMBRE_USUARIO, CONTRASENA, FOTO, FECHA_NACIMIENTO, NOMBRE, APELLIDOS, DESCRIPCION, PROCEDENCIA) VALUES('correo' + RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4) + '@gmail.com','usuario' + RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),  RIGHT(REPLICATE('0',8)+CONVERT(VARCHAR,@V_CONT),8),'foto' + RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),'01.01.2000','nombre'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),'apellido'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),'Descripcion' + RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),'Procedencia' + RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4));

INSERT INTO T_DEGUSTACION ( ID_DEGUSTACION, NOMBRE, CALIFICADOR, TIPO, FOTO, REGION, USUARIO_ANADE, LOCAL_ANADE) VALUES ('degustacion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'nombre_degustacion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'calificador'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'tipo'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'foto'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'region'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), Null, Null);

INSERT INTO T_LOCAL (NOMBRE, COORDENADAS, DIRECCION, AGREGA, FECHA_AGREGA) VALUES ('local'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'coordenadas'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),'direccion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), Null, '7dias')
INSERT INTO T_LOCAL (NOMBRE, COORDENADAS, DIRECCION, AGREGA, FECHA_AGREGA) VALUES ('restaurante'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), 'coordenadas'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4),'direccion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT),4), Null, Null)
IF @V_CONT > @V_NUM_REGISTROS
BREAK;
END;

WHILE @V_CONT2 < @V_NUM_REGISTROS2
BEGIN
SET @V_CONT2 = @V_CONT2 + 1

INSERT INTO T_DEGUSTA (ID_DEGUSTACION,NOMBRE_USUARIO,ORDEN) VALUES ('degustacion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT2),4),'usuario0001',@V_CONT2)

IF @V_CONT2 > @V_NUM_REGISTROS2
BREAK;
END;

WHILE @V_CONT3 < @V_NUM_REGISTROS3
BEGIN
SET @V_CONT3 = @V_CONT3 + 1

INSERT INTO T_TIENE_FAVORITOS (ID_DEGUSTACION,NOMBRE_USUARIO) VALUES ('degustacion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT3),4),'usuario0001')
INSERT INTO T_TIENE_FAVORITOS (ID_DEGUSTACION,NOMBRE_USUARIO) VALUES ('degustacion'+ RIGHT(REPLICATE('0',4)+CONVERT(VARCHAR,@V_CONT3),4),'usuario0002')

IF @V_CONT3 > @V_NUM_REGISTROS3
BREAK;

END;