# Guía de Migración: PHP a Frontend Estático

## 📋 Resumen

Este documento describe la migración del sistema SIGEVEN de un modelo basado en PHP con lógica de servidor embebida a un frontend estático (HTML + CSS + JavaScript modular) preparado para consumir una API externa en el futuro.

## 🎯 Objetivos de la Migración

1. **Desacoplar la lógica del backend**: Separar completamente la lógica de presentación de la lógica de negocio
2. **Preparar para API REST**: Estructura el frontend para consumir APIs RESTful en el futuro
3. **Mantener la funcionalidad**: Simular todas las funcionalidades existentes con datos mock
4. **Preservar el diseño**: Mantener la estructura, colores y estética original
5. **Hosting estático**: Permitir que el sitio funcione sin servidor PHP (GitHub Pages, Netlify, etc.)

---

## 🏗️ Arquitectura Nueva

### Antes (PHP Embebido)
```
┌─────────────────────────────────────┐
│  PHP Files (login.php, etc.)        │
│  ┌─────────────────────────────┐   │
│  │ HTML + PHP Logic + SQL      │   │
│  │ - Session management        │   │
│  │ - Database queries          │   │
│  │ - Form processing           │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
           ↓
      MySQL Database
```

### Después (Frontend Estático + Mock API)
```
┌─────────────────────────────────────┐
│  HTML Files (login.html, etc.)      │
│  ┌─────────────────────────────┐   │
│  │ HTML + JavaScript Modules   │   │
│  │ - api.js (API wrapper)      │   │
│  │ - session.js (localStorage) │   │
│  │ - auth.js (authentication)  │   │
│  │ - user.js (user management) │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
           ↓
   Mock Data (temporal)
           ↓
   Future: REST API → Backend → Database
```

---

## 📁 Estructura de Archivos

### Archivos JavaScript Nuevos

```
SIGEVEN/sistema_de_eventos/js/
├── api.js          # Wrapper para llamadas API con respuestas mock
├── auth.js         # Lógica de autenticación (login, logout, registro)
├── session.js      # Gestión de sesiones en cliente (sessionStorage)
├── user.js         # Utilidades para manejo de datos de usuario
└── notifications.js # Sistema de notificaciones (ya existía)
```

### Páginas HTML Nuevas

```
SIGEVEN/sistema_de_eventos/
├── loginEstudiante.html    # Login para estudiantes
├── loginDocente.html       # Login para docentes
└── sistema_de_eventos_admin/
    └── login.html          # Login para administradores
```

### Páginas Actualizadas

- `PerfilEstudiante.html` - Agregado protección de sesión
- `PerfilDocente.html` - Agregado protección de sesión  
- `NuevoEvento.html` - Agregado protección de sesión

---

## 🔑 Componentes Principales

### 1. api.js - Módulo de API

**Propósito**: Centralizar todas las llamadas a API con soporte para datos mock.

**Características**:
- Wrapper genérico para `fetch()`
- Sistema de respuestas mock para desarrollo
- Flag `useMockData` para cambiar entre mock y API real
- Manejo de errores centralizado

**Endpoints Mock Implementados**:
```javascript
POST /auth/login      // Autenticación de usuario
POST /auth/logout     // Cierre de sesión
POST /auth/register   // Registro de nuevo usuario
GET  /auth/verify     // Verificación de sesión activa
```

**Uso**:
```javascript
// Llamada API con datos mock
const result = await API.request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
        username: 'E20250-1',
        password: 'test123',
        tipo_usuario: 'estudiante'
    })
});
```

**Usuarios Mock Disponibles**:

| Tipo | Usuario | Contraseña | Nombre |
|------|---------|------------|--------|
| Estudiante | E20250-1 | test123 | Juan Pérez González |
| Estudiante | E20250-2 | test123 | María López Silva |
| Docente | A20250-1 | test123 | Dr. Roberto Gutiérrez |
| Docente | A20250-2 | test123 | Ing. Ana Fernández |
| Admin | admin | admin123 | Administrador del Sistema |

---

### 2. session.js - Módulo de Sesión

**Propósito**: Gestionar sesiones de usuario en el cliente usando `sessionStorage`.

**Características**:
- Almacenamiento en `sessionStorage` (se limpia al cerrar navegador)
- Timeout de sesión (1 hora por defecto)
- Verificación de tipo de usuario
- Auto-actualización de actividad
- Protección de páginas con `requireAuth()`

**Datos de Sesión Almacenados**:
```javascript
{
    id: 123,
    tipo_usuario: 'estudiante',
    nombre: 'Juan Pérez González',
    codigo: 'E20250-1',
    correo: 'juan.perez@est.emi.edu.bo',
    timestamp: 1700000000000
}
```

**Uso en Páginas Protegidas**:
```javascript
// Al inicio de cualquier página protegida
Session.requireAuth('estudiante'); // Redirige si no autenticado
```

**Métodos Principales**:
- `create(userData)` - Crear sesión
- `get()` - Obtener datos de sesión
- `isAuthenticated()` - Verificar si hay sesión activa
- `destroy()` - Cerrar sesión
- `requireAuth(userType)` - Proteger página

---

### 3. auth.js - Módulo de Autenticación

**Propósito**: Manejar operaciones de autenticación.

**Características**:
- Login con validación
- Logout con limpieza de sesión
- Registro con validación de formatos
- Verificación de sesión

**Validaciones Implementadas**:
- Formato de código de estudiante: `E00000-0`
- Formato de código de docente: `A00000-0`
- Formato de email válido
- Longitud mínima de contraseña: 6 caracteres

**Uso**:
```javascript
// Login
const result = await Auth.login('E20250-1', 'test123', 'estudiante');
if (result.success) {
    // Redirigir a perfil
}

// Logout
await Auth.logout();
Session.redirectToLogin('estudiante');

// Verificar sesión actual
const user = Auth.getCurrentUser();
```

---

### 4. user.js - Módulo de Usuario

**Propósito**: Utilidades para manejo y visualización de datos de usuario.

**Características**:
- Auto-inicialización en DOM ready
- Actualización automática de elementos con datos de usuario
- Configuración de enlaces de logout
- Formateadores de datos

**Elementos que se Actualizan Automáticamente**:
```html
<!-- Estos elementos se actualizan automáticamente si existen -->
<span id="user-name"><!-- nombre --></span>
<span id="user-code"><!-- código --></span>
<span id="user-email"><!-- correo --></span>
<span id="user-type"><!-- tipo --></span>
```

---

## 🔄 Flujo de Autenticación

### Login
```
1. Usuario visita loginEstudiante.html
   ↓
2. JavaScript verifica si ya hay sesión activa
   ↓ (no hay sesión)
3. Usuario ingresa credenciales y envía formulario
   ↓
4. auth.js valida formato de datos
   ↓
5. api.js llama endpoint mock /auth/login
   ↓
6. Mock API verifica credenciales
   ↓ (éxito)
7. session.js crea sesión en sessionStorage
   ↓
8. Notificación de éxito
   ↓
9. Redirección a PerfilEstudiante.html
```

### Acceso a Página Protegida
```
1. Usuario visita PerfilEstudiante.html
   ↓
2. Session.requireAuth('estudiante') se ejecuta
   ↓
3. session.js verifica sesión en sessionStorage
   ↓
4. session.js verifica que no haya expirado
   ↓
5. session.js verifica tipo de usuario correcto
   ↓ (todo OK)
6. Página se muestra
   ↓
7. user.js actualiza elementos con datos de usuario
   ↓
8. user.js configura enlaces de logout
```

### Logout
```
1. Usuario hace clic en "SALIR"
   ↓
2. user.js intercepta el evento
   ↓
3. auth.js llama endpoint mock /auth/logout
   ↓
4. session.js destruye sesión local
   ↓
5. Redirección a página de login correspondiente
```

---

## 🚀 Migración a API Real

Cuando esté listo el backend real, solo necesita:

### 1. Actualizar api.js
```javascript
const API = {
    baseURL: 'https://api.sigeven.edu.bo', // URL de API real
    useMockData: false, // Cambiar a false
    // ... resto del código igual
};
```

### 2. Implementar Endpoints en Backend

El backend debe implementar estos endpoints:

#### POST /auth/login
```json
// Request
{
    "username": "E20250-1",
    "password": "test123",
    "tipo_usuario": "estudiante"
}

// Response (éxito)
{
    "success": true,
    "data": {
        "id": 123,
        "tipo_usuario": "estudiante",
        "nombre": "Juan Pérez González",
        "codigo": "E20250-1",
        "correo": "juan.perez@est.emi.edu.bo"
    },
    "message": "Login exitoso"
}

// Response (error)
{
    "success": false,
    "message": "Credenciales incorrectas"
}
```

#### POST /auth/logout
```json
// Response
{
    "success": true,
    "message": "Sesión cerrada correctamente"
}
```

#### POST /auth/register
```json
// Request
{
    "nombre": "Juan Pérez",
    "correo": "juan.perez@est.emi.edu.bo",
    "contrasena": "password123",
    "codigo": "E20250-1",
    "tipo_usuario": "estudiante"
}

// Response (éxito)
{
    "success": true,
    "message": "Usuario registrado correctamente",
    "data": {
        "id": 124,
        "tipo_usuario": "estudiante"
    }
}
```

#### GET /auth/verify
```json
// Response (autenticado)
{
    "autenticado": true,
    "usuario": {
        "id": 123,
        "tipo": "estudiante",
        "nombre": "Juan Pérez González",
        "codigo": "E20250-1",
        "correo": "juan.perez@est.emi.edu.bo"
    }
}

// Response (no autenticado)
{
    "autenticado": false
}
```

### 3. Manejo de Sesiones en Backend

El backend debe:
- Generar tokens JWT o usar sesiones de servidor
- Validar tokens en cada request
- Implementar timeout de sesión
- Retornar cookies HttpOnly para seguridad

### 4. CORS Configuration

Configurar CORS en el backend:
```javascript
// Ejemplo Node.js/Express
app.use(cors({
    origin: 'https://sigeven.edu.bo',
    credentials: true
}));
```

---

## 🔒 Seguridad

### Medidas Implementadas en el Frontend

1. **Validación de entrada**: Todos los formularios validan formato antes de enviar
2. **Sanitización**: No se ejecuta código no confiable
3. **Session timeout**: Las sesiones expiran después de 1 hora de inactividad
4. **Protección de páginas**: `requireAuth()` previene acceso no autorizado
5. **Verificación de tipo de usuario**: Cada página verifica el tipo correcto

### Consideraciones para Producción

⚠️ **El sistema actual usa datos mock y sessionStorage. Para producción real necesita**:

1. **Backend con base de datos real**: No confiar solo en frontend
2. **Tokens JWT**: Para autenticación stateless y segura
3. **HTTPS**: Toda comunicación debe ser encriptada
4. **Rate limiting**: Prevenir ataques de fuerza bruta
5. **Validación en servidor**: Nunca confiar en validación de cliente solamente
6. **Password hashing**: bcrypt o Argon2 en el servidor
7. **CSRF tokens**: Para prevenir ataques CSRF
8. **Content Security Policy**: Headers de seguridad apropiados

---

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Tecnologías Usadas
- **JavaScript ES6+**: Módulos, async/await, arrow functions
- **sessionStorage API**: Para almacenamiento temporal de sesión
- **Fetch API**: Para llamadas HTTP
- **CSS3**: Flexbox, Grid, Custom Properties

---

## 🧪 Testing

### Credenciales de Prueba

Usar estas credenciales para probar el sistema:

**Estudiantes**:
```
Usuario: E20250-1
Contraseña: test123

Usuario: E20250-2
Contraseña: test123
```

**Docentes**:
```
Usuario: A20250-1
Contraseña: test123

Usuario: A20250-2
Contraseña: test123
```

**Administradores**:
```
Usuario: admin
Contraseña: admin123
```

### Flujos a Probar

1. ✅ Login estudiante → Ver perfil → Logout
2. ✅ Login docente → Ver perfil → Crear evento → Logout
3. ✅ Login admin → Ver panel → Logout
4. ✅ Intentar acceder a página protegida sin login (debe redirigir)
5. ✅ Intentar acceder a página de docente con cuenta de estudiante (debe redirigir)
6. ✅ Session timeout después de 1 hora

---

## 📝 Notas Importantes

### Archivos PHP Originales

Los archivos PHP originales **NO han sido eliminados**. Están en:
- `SIGEVEN/login.php`
- `SIGEVEN/sistema_de_eventos/php/` (todo el directorio)
- `SIGEVEN/sistema_de_eventos_admin/login.php`

Si necesita volver al sistema PHP, simplemente use esos archivos.

### Diferencias con PHP

| Aspecto | PHP (antes) | JavaScript (ahora) |
|---------|-------------|-------------------|
| Sesiones | Servidor (PHP $_SESSION) | Cliente (sessionStorage) |
| Validación | Servidor + Cliente | Cliente (temporal) |
| Datos | MySQL real | Mock data |
| Estado | Stateful (servidor) | Stateless (cliente) |
| Persistencia | Hasta logout | Hasta cerrar navegador |

### Limitaciones Actuales

⚠️ **Sistema de desarrollo - NO para producción**:

1. **Datos mock**: Los usuarios son ficticios
2. **sessionStorage**: Se pierde al cerrar navegador
3. **Sin persistencia**: No se guardan cambios reales
4. **Sin validación de servidor**: Cualquier request es confiable
5. **Sin encriptación**: Las contraseñas no se hashean

---

## 🚦 Próximos Pasos

### Fase 1: Completar Frontend (actual)
- [x] Módulos JavaScript creados
- [x] Páginas de login convertidas
- [x] Protección de páginas implementada
- [ ] Todas las páginas migradas
- [ ] Formularios actualizados

### Fase 2: Desarrollo de Backend
- [ ] Diseñar API REST
- [ ] Implementar endpoints
- [ ] Conectar con base de datos
- [ ] Implementar autenticación JWT
- [ ] Testing de integración

### Fase 3: Integración
- [ ] Actualizar `api.js` con URLs reales
- [ ] Cambiar `useMockData` a false
- [ ] Testing end-to-end
- [ ] Deployment

---

## 📞 Soporte

Si tienes preguntas sobre la migración:

1. Revisa este documento
2. Consulta los comentarios en los archivos JavaScript
3. Prueba con las credenciales mock
4. Verifica la consola del navegador para errores

---

## 📚 Referencias

- [MDN Web Docs - Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN Web Docs - sessionStorage](https://developer.mozilla.org/es/docs/Web/API/Window/sessionStorage)
- [JWT.io - JSON Web Tokens](https://jwt.io/)
- [OWASP - Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

**Versión**: 1.0  
**Fecha**: 2025-11-20  
**Autor**: Sistema de Migración SIGEVEN
