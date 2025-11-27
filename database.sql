-- Crear base de datos
IF DB_ID('SIGEVEN') IS NULL
    CREATE DATABASE SIGEVEN;
GO

USE SIGEVEN;
GO

-- Limpiar tablas si existen (para re-ejecutar el script)
IF OBJECT_ID('dbo.EventoParticipante', 'U') IS NOT NULL DROP TABLE dbo.EventoParticipante;
IF OBJECT_ID('dbo.SolicitudReserva', 'U') IS NOT NULL DROP TABLE dbo.SolicitudReserva;
IF OBJECT_ID('dbo.Evento', 'U') IS NOT NULL DROP TABLE dbo.Evento;
IF OBJECT_ID('dbo.Espacio', 'U') IS NOT NULL DROP TABLE dbo.Espacio;
IF OBJECT_ID('dbo.Usuario', 'U') IS NOT NULL DROP TABLE dbo.Usuario;
IF OBJECT_ID('dbo.Rol', 'U') IS NOT NULL DROP TABLE dbo.Rol;
GO

CREATE TABLE Rol (
    IdRol INT IDENTITY(1,1) PRIMARY KEY,
    NombreRol VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(200) NULL
);
GO

INSERT INTO Rol (NombreRol, Descripcion) VALUES
('ESTUDIANTE', 'Usuario estudiante de la universidad'),
('DOCENTE',    'Usuario docente de la universidad'),
('ADMIN',      'Administrador del sistema y de espacios');
GO

CREATE TABLE Usuario (
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
    IdRol INT NOT NULL FOREIGN KEY REFERENCES Rol(IdRol),
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    CI VARCHAR(20) NOT NULL,
    ExpedicionCI VARCHAR(5) NOT NULL,
    CorreoInstitucional VARCHAR(150) NOT NULL UNIQUE,
    CorreoPersonal VARCHAR(150) NULL,
    Telefono VARCHAR(20) NULL,
    FechaRegistro DATETIME NOT NULL DEFAULT(GETDATE()),
    Activo BIT NOT NULL DEFAULT(1)
);
GO

CREATE TABLE Espacio (
    IdEspacio INT IDENTITY(1,1) PRIMARY KEY,
    NombreEspacio VARCHAR(100) NOT NULL,
    TipoEspacio VARCHAR(50) NOT NULL,
    Capacidad INT NOT NULL,
    Ubicacion VARCHAR(150) NOT NULL,
    Descripcion VARCHAR(300) NULL,
    Disponible BIT NOT NULL DEFAULT(1)
);
GO

CREATE TABLE Evento (
    IdEvento INT IDENTITY(1,1) PRIMARY KEY,
    IdEspacio INT NOT NULL FOREIGN KEY REFERENCES Espacio(IdEspacio),
    IdOrganizador INT NOT NULL FOREIGN KEY REFERENCES Usuario(IdUsuario),
    Titulo VARCHAR(150) NOT NULL,
    Descripcion VARCHAR(500) NULL,
    FechaInicio DATETIME NOT NULL,
    FechaFin DATETIME NOT NULL,
    TipoEvento VARCHAR(50) NOT NULL,
    Estado VARCHAR(30) NOT NULL,
    FechaRegistro DATETIME NOT NULL DEFAULT(GETDATE())
);
GO

CREATE TABLE SolicitudReserva (
    IdSolicitud INT IDENTITY(1,1) PRIMARY KEY,
    IdSolicitante INT NOT NULL FOREIGN KEY REFERENCES Usuario(IdUsuario),
    IdEspacio INT NOT NULL FOREIGN KEY REFERENCES Espacio(IdEspacio),
    FechaSolicitud DATETIME NOT NULL DEFAULT(GETDATE()),
    FechaInicioSolicitada DATETIME NOT NULL,
    FechaFinSolicitada DATETIME NOT NULL,
    Motivo VARCHAR(300) NOT NULL,
    EstadoSolicitud VARCHAR(30) NOT NULL,
    ObservacionAdmin VARCHAR(300) NULL,
    IdAdminRespuesta INT NULL FOREIGN KEY REFERENCES Usuario(IdUsuario),
    FechaRespuesta DATETIME NULL
);
GO

CREATE TABLE EventoParticipante (
    IdEvento INT NOT NULL FOREIGN KEY REFERENCES Evento(IdEvento),
    IdUsuario INT NOT NULL FOREIGN KEY REFERENCES Usuario(IdUsuario),
    RolEnEvento VARCHAR(50) NOT NULL,
    AsistenciaConfirmada BIT NOT NULL DEFAULT(0),
    PRIMARY KEY (IdEvento, IdUsuario)
);
GO

INSERT INTO Usuario (IdRol, Nombres, Apellidos, CI, ExpedicionCI, CorreoInstitucional, CorreoPersonal, Telefono)
VALUES
(1, 'Carlos Andrés', 'Quispe Mamani', '8234561', 'LP', 'carlos.quispe@umsa.bo', 'carlos.quispe@gmail.com', '72034561'),
(1, 'María Fernanda', 'Choque Flores', '7345123', 'CBBA', 'maria.choque@umss.bo', 'maria.fernanda.choque@gmail.com', '76451230'),
(1, 'Juan Pablo', 'Cruz Condori', '9123456', 'SCZ', 'juan.cruz@uasb.bo', 'jpcruz@hotmail.com', '78123456'),
(1, 'Ana Sofía', 'Gutiérrez Rocha', '6451234', 'LP', 'ana.gutierrez@umsa.bo', 'anagutierrez@gmail.com', '76543210'),
(1, 'Luis Alberto', 'Rojas Ticona', '7012345', 'OR', 'luis.rojas@uto.bo', 'luisalbertorojas@outlook.com', '76321458');

INSERT INTO Usuario (IdRol, Nombres, Apellidos, CI, ExpedicionCI, CorreoInstitucional, CorreoPersonal, Telefono)
VALUES
(2, 'Rodrigo', 'Vargas Salazar', '4056123', 'LP', 'rodrigo.vargas@umsa.bo', 'rvargas@gmail.com', '70123456'),
(2, 'Gabriela', 'Mendoza Aguilar', '3894512', 'CBBA', 'gabriela.mendoza@umss.bo', 'gmendoza@yahoo.com', '78561234'),
(2, 'Hugo', 'Fernández Ríos', '4561234', 'SCZ', 'hugo.fernandez@ecoru.edu.bo', 'hfernandez@gmail.com', '71987654');

INSERT INTO Usuario (IdRol, Nombres, Apellidos, CI, ExpedicionCI, CorreoInstitucional, CorreoPersonal, Telefono)
VALUES
(3, 'Verónica', 'López Pérez', '2987456', 'LP', 'veronica.lopez@adm.umsa.bo', 'vlopez.adm@gmail.com', '72564321'),
(3, 'Miguel', 'Arce Villarroel', '3124589', 'CBBA', 'miguel.arce@adm.umss.bo', 'marce.admin@yahoo.com', '73549876');
GO

INSERT INTO Espacio (NombreEspacio, TipoEspacio, Capacidad, Ubicacion, Descripcion)
VALUES
('Aula 201',        'AULA',       40,  'Bloque A - 2do piso', 'Aula mediana para clases teóricas'),
('Aula 305',        'AULA',       35,  'Bloque B - 3er piso', 'Aula con proyector'),
('Auditorio Central', 'AUDITORIO', 250, 'Bloque Central',     'Auditorio principal para ceremonias y conferencias'),
('Cancha Polifuncional', 'CANCHA', 150, 'Complejo Deportivo', 'Cancha para futsal, basquet y voleibol'),
('Laboratorio de Cómputo 1', 'LABORATORIO', 30, 'Bloque de Sistemas - 1er piso', 'Laboratorio con 30 computadoras conectadas a internet'),
('Sala de Reuniones', 'AULA', 20, 'Bloque Administrativo - 1er piso', 'Sala para reuniones de consejo y comisiones');
GO

INSERT INTO Evento (IdEspacio, IdOrganizador, Titulo, Descripcion, FechaInicio, FechaFin, TipoEvento, Estado)
VALUES
(3, 6,
 'Seminario de Actualización en Ingeniería de Sistemas',
 'Seminario dirigido a estudiantes de últimos años sobre tendencias en desarrollo web y ciberseguridad.',
 '2025-03-15 08:30:00', '2025-03-15 12:30:00',
 'ACADEMICO', 'PROGRAMADO');

INSERT INTO Evento (IdEspacio, IdOrganizador, Titulo, Descripcion, FechaInicio, FechaFin, TipoEvento, Estado)
VALUES
(4, 9,
 'Campeonato Relámpago de Futsal Intercarreras',
 'Torneo de futsal con participación de diferentes carreras de la facultad.',
 '2025-04-20 14:00:00', '2025-04-20 20:00:00',
 'DEPORTIVO', 'PROGRAMADO');

INSERT INTO Evento (IdEspacio, IdOrganizador, Titulo, Descripcion, FechaInicio, FechaFin, TipoEvento, Estado)
VALUES
(1, 7,
 'Defensa de Tesis - Carlos Quispe',
 'Defensa de tesis de grado en Ingeniería de Sistemas del estudiante Carlos Andrés Quispe Mamani.',
 '2025-02-10 09:00:00', '2025-02-10 11:00:00',
 'ACADEMICO', 'FINALIZADO');

INSERT INTO Evento (IdEspacio, IdOrganizador, Titulo, Descripcion, FechaInicio, FechaFin, TipoEvento, Estado)
VALUES
(3, 10,
 'Noche Cultural Paceña',
 'Presentaciones de danza, música y poesía de grupos estudiantiles.',
 '2025-05-25 18:00:00', '2025-05-25 22:00:00',
 'CULTURAL', 'PROGRAMADO');

INSERT INTO Evento (IdEspacio, IdOrganizador, Titulo, Descripcion, FechaInicio, FechaFin, TipoEvento, Estado)
VALUES
(6, 9,
 'Reunión de Consejo Facultativo',
 'Sesión ordinaria del consejo facultativo para tratar temas administrativos.',
 '2025-01-28 09:30:00', '2025-01-28 12:00:00',
 'ADMINISTRATIVO', 'FINALIZADO');
GO

INSERT INTO EventoParticipante (IdEvento, IdUsuario, RolEnEvento, AsistenciaConfirmada) VALUES
(1, 6, 'EXPOSITOR', 1),
(1, 1, 'ASISTENTE', 1),
(1, 2, 'ASISTENTE', 1),
(1, 3, 'ASISTENTE', 0),
(1, 4, 'ASISTENTE', 1),
(1, 5, 'ASISTENTE', 0);

INSERT INTO EventoParticipante (IdEvento, IdUsuario, RolEnEvento, AsistenciaConfirmada) VALUES
(2, 9, 'ORGANIZADOR', 1),
(2, 1, 'ASISTENTE', 1),
(2, 3, 'ASISTENTE', 1),
(2, 5, 'ASISTENTE', 1),
(2, 7, 'ASISTENTE', 1);

INSERT INTO EventoParticipante (IdEvento, IdUsuario, RolEnEvento, AsistenciaConfirmada) VALUES
(3, 1, 'EXPOSITOR', 1),
(3, 6, 'ORGANIZADOR', 1),
(3, 7, 'ASISTENTE', 1),
(3, 8, 'ASISTENTE', 1),
(3, 9, 'ASISTENTE', 1);

INSERT INTO EventoParticipante (IdEvento, IdUsuario, RolEnEvento, AsistenciaConfirmada) VALUES
(4, 10, 'ORGANIZADOR', 1),
(4, 2,  'ASISTENTE', 1),
(4, 3,  'ASISTENTE', 1),
(4, 4,  'ASISTENTE', 1),
(4, 5,  'ASISTENTE', 0),
(4, 6,  'ASISTENTE', 1);

INSERT INTO EventoParticipante (IdEvento, IdUsuario, RolEnEvento, AsistenciaConfirmada) VALUES
(5, 9,  'ORGANIZADOR', 1),
(5, 10, 'ASISTENTE', 1),
(5, 7,  'ASISTENTE', 1),
(5, 8,  'ASISTENTE', 1);
GO

INSERT INTO SolicitudReserva
(IdSolicitante, IdEspacio, FechaInicioSolicitada, FechaFinSolicitada, Motivo, EstadoSolicitud)
VALUES
(1, 1,
 '2025-03-10 08:00:00', '2025-03-10 10:00:00',
 'Uso de aula para estudio grupal previo a exámenes parciales.',
 'PENDIENTE');

INSERT INTO SolicitudReserva
(IdSolicitante, IdEspacio, FechaInicioSolicitada, FechaFinSolicitada, Motivo, EstadoSolicitud, ObservacionAdmin, IdAdminRespuesta, FechaRespuesta)
VALUES
(2, 3,
 '2025-03-15 08:00:00', '2025-03-15 13:00:00',
 'Reserva del Auditorio Central para seminario de Ingeniería de Sistemas.',
 'APROBADA',
 'Aprobado. Coordinar con personal de sonido y proyección.',
 9,
 '2025-02-20 10:15:00');

INSERT INTO SolicitudReserva
(IdSolicitante, IdEspacio, FechaInicioSolicitada, FechaFinSolicitada, Motivo, EstadoSolicitud, ObservacionAdmin, IdAdminRespuesta, FechaRespuesta)
VALUES
(3, 4,
 '2025-04-20 15:00:00', '2025-04-20 19:00:00',
 'Solicitud de cancha para entrenamiento de equipo de futsal.',
 'RECHAZADA',
 'Rechazado por existir el Campeonato Relámpago en ese horario.',
 9,
 '2025-03-30 09:45:00');

INSERT INTO SolicitudReserva
(IdSolicitante, IdEspacio, FechaInicioSolicitada, FechaFinSolicitada, Motivo, EstadoSolicitud, ObservacionAdmin, IdAdminRespuesta, FechaRespuesta)
VALUES
(4, 5,
 '2025-02-05 16:00:00', '2025-02-05 18:00:00',
 'Práctica de desarrollo web para proyecto final.',
 'APROBADA',
 'Aprobado, se habilitará acceso a internet y proyector.',
 10,
 '2025-01-25 11:30:00');

INSERT INTO SolicitudReserva
(IdSolicitante, IdEspacio, FechaInicioSolicitada, FechaFinSolicitada, Motivo, EstadoSolicitud, ObservacionAdmin, IdAdminRespuesta, FechaRespuesta)
VALUES
(5, 2,
 '2025-02-12 10:00:00', '2025-02-12 12:00:00',
 'Uso de aula para reunión de grupo de estudio.',
 'CANCELADA',
 'Solicitud cancelada a petición del estudiante.',
 10,
 '2025-02-10 08:20:00');
GO