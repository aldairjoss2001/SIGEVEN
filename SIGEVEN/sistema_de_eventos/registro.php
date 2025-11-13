<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro de Usuario</title>
  <link rel="stylesheet" href="css/auth.css">
</head>
<body>
  <a class="skip-link" href="#main">Saltar al contenido</a>

  <header>
    <div class="header-inner">
      <img src="assets/icons/mobile.png" alt="logo" class="logo" />
      <nav class="main-nav" aria-label="Menú principal">
        <ul class="main-menu">
          <li><a href="index.html">INICIO</a></li>
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
          <h1>Registro de Usuario</h1>
          <p>Crea tu cuenta en SIGEVEN</p>
        </div>

        <div id="mensaje-error" style="display: none; padding: 10px; margin-bottom: 15px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px;"></div>
        <div id="mensaje-exito" style="display: none; padding: 10px; margin-bottom: 15px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px;"></div>

        <form action="php/insertar_usuario.php" method="POST" id="form-registro">
          <div class="form-group">
            <label for="tipo_usuario">Tipo de Usuario</label>
            <select id="tipo_usuario" name="tipo_usuario" required onchange="actualizarPlaceholderCodigo()">
              <option value="">Selecciona tu tipo</option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
            </select>
          </div>

          <div class="form-group">
            <label for="codigo">Código</label>
            <input type="text" id="codigo" name="codigo" required placeholder="Selecciona primero el tipo de usuario">
          </div>

          <div class="form-group">
            <label for="nombre">Nombre Completo</label>
            <input type="text" id="nombre" name="nombre" required placeholder="Ingresa tu nombre completo">
          </div>

          <div class="form-group">
            <label for="correo">Correo Electrónico</label>
            <input type="email" id="correo" name="correo" required placeholder="ejemplo@correo.com">
          </div>

          <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <input type="password" id="contrasena" name="contrasena" required minlength="6" placeholder="Mínimo 6 caracteres">
          </div>

          <button type="submit" class="btn-auth primary-btn">Registrarse</button>
        </form>

        <div class="auth-links">
          <p>
            ¿Ya tienes cuenta? 
            <a href="loginEstudiante.html">Iniciar Sesión</a>
          </p>
        </div>
      </div>
    </div>
  </main>

  <footer>
    <p style="color: #fed600">© 2025 Sistema de Gestión de Eventos Universitarios. Todos los derechos reservados.</p>
  </footer>

  <script>
    function actualizarPlaceholderCodigo() {
      const tipoUsuario = document.getElementById('tipo_usuario').value;
      const codigoInput = document.getElementById('codigo');
      
      if (tipoUsuario === 'estudiante') {
        codigoInput.placeholder = 'Ej: E20250-1';
        codigoInput.pattern = 'E[0-9]{5}-[0-9]';
        codigoInput.title = 'Formato requerido: EXXXXX-X (donde X son números)';
      } else if (tipoUsuario === 'docente') {
        codigoInput.placeholder = 'Ej: A20250-1';
        codigoInput.pattern = 'A[0-9]{5}-[0-9]';
        codigoInput.title = 'Formato requerido: AXXXXX-X (donde X son números)';
      } else {
        codigoInput.placeholder = 'Selecciona primero el tipo de usuario';
        codigoInput.pattern = '';
        codigoInput.title = '';
      }
    }

    // Mostrar mensajes de error/éxito desde PHP
    window.addEventListener('DOMContentLoaded', function() {
      <?php
      session_start();
      if (isset($_SESSION['error_registro'])) {
          echo "document.getElementById('mensaje-error').textContent = '" . addslashes($_SESSION['error_registro']) . "';";
          echo "document.getElementById('mensaje-error').style.display = 'block';";
          unset($_SESSION['error_registro']);
      }
      if (isset($_SESSION['exito_registro'])) {
          echo "document.getElementById('mensaje-exito').textContent = '" . addslashes($_SESSION['exito_registro']) . "';";
          echo "document.getElementById('mensaje-exito').style.display = 'block';";
          unset($_SESSION['exito_registro']);
      }
      ?>
    });
  </script>
</body>
</html>
