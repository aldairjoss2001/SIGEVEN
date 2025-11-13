<?php
/**
 * Archivo: login.php
 * Descripción: Formulario de inicio de sesión unificado
 * Ubicación: C:\xampp\htdocs\SIGEVEN\login.php
 * URL: http://localhost/SIGEVEN/login.php
 */

// Iniciar sesión para mostrar mensajes de error
session_start();

// Incluir archivo de conexión
require_once 'conexion.php';

// Variable para mensajes de error
$error = '';

// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener datos del formulario
    $correo = $_POST['correo'] ?? '';
    $contrasena = $_POST['contrasena'] ?? '';
    
    // Validar que los campos no estén vacíos
    if (empty($correo) || empty($contrasena)) {
        $error = 'Por favor, complete todos los campos';
    } else {
        try {
            // Buscar el usuario en la base de datos por correo
            $stmt = $conn->prepare("SELECT id, nombre, correo, contrasena FROM usuarios WHERE correo = :correo");
            $stmt->bindParam(':correo', $correo);
            $stmt->execute();
            
            $usuario = $stmt->fetch();
            
            // Verificar si el usuario existe
            if ($usuario) {
                // Verificar la contraseña
                if (password_verify($contrasena, $usuario['contrasena'])) {
                    // Contraseña correcta
                    
                    // Determinar el rol según el dominio del correo
                    $rol = obtener_rol_por_correo($usuario['correo']);
                    
                    // Verificar que el rol sea válido
                    if ($rol === 'desconocido') {
                        $error = 'El dominio de correo no está autorizado';
                    } else {
                        // Guardar datos en la sesión
                        $_SESSION['id'] = $usuario['id'];
                        $_SESSION['nombre'] = $usuario['nombre'];
                        $_SESSION['correo'] = $usuario['correo'];
                        $_SESSION['rol'] = $rol;
                        
                        // Redirigir según el rol
                        if ($rol === 'estudiante') {
                            header('Location: dashboard_estudiante.php');
                        } elseif ($rol === 'docente') {
                            header('Location: dashboard_docente.php');
                        } elseif ($rol === 'administrativo') {
                            header('Location: dashboard_admin.php');
                        }
                        exit();
                    }
                } else {
                    // Contraseña incorrecta
                    $error = 'Correo o contraseña incorrectos';
                }
            } else {
                // Usuario no encontrado
                $error = 'Correo o contraseña incorrectos';
            }
        } catch(PDOException $e) {
            $error = 'Error al procesar la solicitud. Intente nuevamente.';
            // En desarrollo puedes mostrar el error: $error = $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesión - SIGEVEN</title>
    <link rel="stylesheet" href="sistema_de_eventos/css/auth.css">
</head>
<body>
    <a class="skip-link" href="#main">Saltar al contenido</a>

    <header>
        <div class="header-inner">
            <img src="sistema_de_eventos/assets/icons/mobile.png" alt="logo" class="logo" />
            <nav class="main-nav" aria-label="Menú principal">
                <ul class="main-menu">
                    <li><a href="sistema_de_eventos/index.html">INICIO</a></li>
                    <li><a href="#">AYUDA</a></li>
                    <li><a href="#">CONTACTO</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <div id="main" class="auth-container">
            <div class="login-form">
                <div class="form-header">
                    <h1>SIGEVEN</h1>
                    <p>Sistema de Gestión de Eventos</p>
                </div>

                <?php if (!empty($error)): ?>
                    <div id="mensaje-error" style="display: block; padding: 10px; margin-bottom: 15px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px;">
                        <?php echo htmlspecialchars($error); ?>
                    </div>
                <?php endif; ?>

                <form method="POST" action="login.php">
                    <div class="form-group">
                        <label for="correo">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="correo" 
                            name="correo" 
                            placeholder="ejemplo@est.emi.edu.bo"
                            required
                            autocomplete="email"
                            value="<?php echo isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : ''; ?>"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="contrasena">Contraseña</label>
                        <input 
                            type="password" 
                            id="contrasena" 
                            name="contrasena" 
                            placeholder="Ingrese su contraseña"
                            required
                            autocomplete="current-password"
                        >
                    </div>
                    
                    <button type="submit" class="btn-auth primary-btn">
                        Iniciar Sesión
                    </button>
                </form>
                
                <div class="auth-links">
                    <p>
                        ¿Necesitas crear una cuenta?
                        <a href="crear_usuario_demo.php">Regístrate aquí</a>
                    </p>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p style="color: #fed600">© 2025 Sistema de Gestión de Eventos Universitarios. Todos los derechos reservados.</p>
    </footer>
</body>
</html>
