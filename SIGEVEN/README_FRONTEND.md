# SIGEVEN - Frontend Estático

## 📋 Descripción

Frontend estático del Sistema de Gestión de Eventos Universitarios (SIGEVEN) de la EMI. 

Este proyecto ha sido migrado de PHP a un modelo de frontend estático que puede:
- Funcionar completamente sin servidor PHP
- Consumir una API REST externa (cuando esté disponible)
- Ser hospedado en servicios de hosting estático (GitHub Pages, Netlify, etc.)

## ✨ Características

- 🔐 **Autenticación simulada** con datos mock para desarrollo
- 👥 **Tres tipos de usuario**: Estudiantes, Docentes, Administrativos
- 📱 **Diseño responsive** con Material Design Icons
- 🎨 **Interfaz moderna** preservando la identidad visual EMI
- 🔒 **Protección de rutas** con validación de sesión en cliente
- 📊 **Sistema modular** JavaScript ES6+ 

## 🚀 Inicio Rápido

### Opción 1: Servidor Local Simple

```bash
# Con Python 3
cd SIGEVEN
python -m http.server 8000

# Con Node.js
npx http-server SIGEVEN -p 8000

# Con PHP (también funciona)
cd SIGEVEN
php -S localhost:8000
```

Luego abre: `http://localhost:8000/sistema_de_eventos/loginEstudiante.html`

### Opción 2: GitHub Pages

1. Sube el proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama y carpeta `/SIGEVEN`
4. Accede a tu sitio en `https://tu-usuario.github.io/repo-name/sistema_de_eventos/`

### Opción 3: Netlify

1. Arrastra la carpeta `SIGEVEN` a Netlify
2. El sitio estará disponible inmediatamente

## 🔑 Credenciales de Prueba

### Estudiantes
```
Usuario: E20250-1
Contraseña: test123

Usuario: E20250-2
Contraseña: test123
```

### Docentes
```
Usuario: A20250-1
Contraseña: test123

Usuario: A20250-2
Contraseña: test123
```

### Administradores
```
Usuario: admin
Contraseña: admin123
```

## 📁 Estructura del Proyecto

```
SIGEVEN/
├── sistema_de_eventos/
│   ├── js/
│   │   ├── api.js           # Módulo de API con respuestas mock
│   │   ├── auth.js          # Autenticación
│   │   ├── session.js       # Gestión de sesiones
│   │   ├── user.js          # Utilidades de usuario
│   │   └── notifications.js # Sistema de notificaciones
│   ├── css/                 # Estilos
│   ├── assets/              # Recursos (imágenes, iconos)
│   ├── loginEstudiante.html # Login estudiantes
│   ├── loginDocente.html    # Login docentes
│   ├── PerfilEstudiante.html
│   ├── PerfilDocente.html
│   ├── NuevoEvento.html
│   └── ...
├── sistema_de_eventos_admin/
│   └── login.html           # Login administrativo
└── MIGRATION_GUIDE.md       # Guía completa de migración
```

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos (Flexbox, Grid, Variables CSS)
- **JavaScript ES6+** - Lógica modular
- **Material Icons** - Iconografía de Google
- **sessionStorage API** - Gestión de sesión en cliente

## 🔄 Flujo de Uso

1. **Login**: El usuario accede a una página de login según su tipo
2. **Autenticación**: JavaScript valida credenciales contra datos mock
3. **Sesión**: Si es válido, se crea una sesión en `sessionStorage`
4. **Navegación**: El usuario accede a su perfil y funcionalidades
5. **Protección**: Cada página verifica la sesión antes de mostrar contenido
6. **Logout**: Al salir, se destruye la sesión y redirige al login

## 🎯 Páginas de Acceso

### Estudiantes
- Login: `/sistema_de_eventos/loginEstudiante.html`
- Perfil: `/sistema_de_eventos/PerfilEstudiante.html`
- Solicitudes: `/sistema_de_eventos/solicitudesEstudiantes.html`
- Calendario: `/sistema_de_eventos/calendarioEstudiantes.html`

### Docentes
- Login: `/sistema_de_eventos/loginDocente.html`
- Perfil: `/sistema_de_eventos/PerfilDocente.html`
- Nuevo Evento: `/sistema_de_eventos/NuevoEvento.html`
- Solicitudes: `/sistema_de_eventos/solicitudesDocentes.html`
- Calendario: `/sistema_de_eventos/calendarioDocentes.html`

### Administradores
- Login: `/sistema_de_eventos_admin/login.html`
- Panel: `/sistema_de_eventos_admin/index.html`

## ⚙️ Configuración para API Real

Cuando el backend esté listo, actualiza `js/api.js`:

```javascript
const API = {
    baseURL: 'https://tu-api.com/api/v1',  // URL de tu API
    useMockData: false,                     // Cambiar a false
    // ...
};
```

El backend debe implementar estos endpoints:
- `POST /auth/login` - Autenticación
- `POST /auth/logout` - Cierre de sesión
- `POST /auth/register` - Registro
- `GET /auth/verify` - Verificación de sesión

Ver `MIGRATION_GUIDE.md` para detalles completos de la API esperada.

## 🔒 Seguridad

### ⚠️ IMPORTANTE
Este es un sistema de **DESARROLLO** que usa datos mock. Para producción necesitas:

- ✅ Backend real con base de datos
- ✅ Autenticación JWT o sesiones de servidor
- ✅ HTTPS obligatorio
- ✅ Validación en servidor (no confiar en cliente)
- ✅ Password hashing (bcrypt/Argon2)
- ✅ Rate limiting contra ataques
- ✅ CSRF protection
- ✅ Content Security Policy headers

### Sesiones Actuales
- Almacenadas en `sessionStorage` (solo cliente)
- Duran 1 hora de inactividad
- Se borran al cerrar el navegador
- **NO son seguras para producción**

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispositivos
- Desktop (1920x1080 óptimo)
- Tablet (768px+)
- Mobile (responsive)

## 🐛 Debugging

Si algo no funciona:

1. **Abre la consola del navegador** (F12)
2. Busca errores en la pestaña Console
3. Verifica la pestaña Network para ver requests
4. Verifica sessionStorage en Application/Storage

### Problemas Comunes

**No puedo iniciar sesión**:
- Verifica que uses las credenciales correctas (ver arriba)
- Abre la consola y mira errores
- Verifica que los archivos JS se carguen correctamente

**Página redirige al login inmediatamente**:
- Verifica que tengas sesión activa (abre console → `Session.get()`)
- Puede que la sesión haya expirado (1 hora)
- Limpia sessionStorage: `sessionStorage.clear()`

**Estilos no se cargan**:
- Verifica las rutas de los archivos CSS
- Asegúrate de tener un servidor web corriendo
- Algunos navegadores bloquean archivos locales sin servidor

## 📚 Documentación

- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Guía completa de migración y arquitectura
- [README_UNIFICADO.md](README_UNIFICADO.md) - Documentación original del sistema PHP
- Comentarios inline en todos los archivos JavaScript

## 🤝 Contribuir

1. Mantén el estilo de código consistente
2. Agrega comentarios en español
3. Sigue el patrón modular existente
4. Prueba en múltiples navegadores
5. Actualiza la documentación

## 📝 Notas

- Los archivos PHP originales **NO** han sido eliminados
- Puedes usar el sistema PHP si lo prefieres
- Este frontend está listo para integrarse con cualquier backend REST
- El diseño y colores se mantienen fieles al original

## 📄 Licencia

© 2025 Sistema de Gestión de Eventos Universitarios - EMI

---

**Estado**: ✅ Frontend completado y funcional con datos mock  
**Próximo paso**: Desarrollo de backend API REST  
**Versión**: 1.0  
**Fecha**: 2025-11-20
