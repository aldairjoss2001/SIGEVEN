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
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .login-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            padding: 40px;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .login-header h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .login-header p {
            color: #666;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            color: #333;
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 5px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .error-message {
            background: #fee;
            color: #c33;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 14px;
            border-left: 4px solid #c33;
        }
        
        .btn-login {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-login:active {
            transform: translateY(0);
        }
        
        .login-footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>SIGEVEN</h1>
            <p>Sistema de Gestión de Eventos</p>
        </div>
        
        <?php if (!empty($error)): ?>
            <div class="error-message">
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
            
            <button type="submit" class="btn-login">Iniciar Sesión</button>
        </form>
        
        <div class="login-footer">
            <p>© 2025 Sistema de Gestión de Eventos Universitarios</p>
        </div>
    </div>
</body>
</html>
