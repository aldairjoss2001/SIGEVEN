<?php
include("conexion.php");

$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

// Encriptar contraseña
$hash = password_hash($contraseña, PASSWORD_BCRYPT);

$sql = "INSERT INTO usuarios (nombre, correo, contraseña)
        VALUES ('$nombre', '$correo', '$hash')";

if ($conn->query($sql) === TRUE) {
    echo "Usuario registrado correctamente";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
