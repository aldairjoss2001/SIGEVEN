<?php
$host = "localhost";
$user = "root"; // usuario por defecto de WAMP
$pass = ""; // contraseña vacía por defecto
$db = "sigeven";

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
