<?php 

require_once('library.php');
session_start(); // Inicia la sessió

$_SESSION['id_usuario'] = $_SESSION['userID'];


if (!isset($_SESSION['id_usuario'])) {
    echo "Error: Usuari no autenticat.";
    exit;
}

if (isset($_GET['id_juego']) && is_numeric($_GET['id_juego'])) {
    $id_juego = $_GET['id_juego'];
} else {
    echo "Error: id_juego no vàlid.";
    exit;
}

if (isset($_GET['puntuacio']) && is_numeric($_GET['puntuacio'])) { // Nom corregit
    $puntuacion = $_GET['puntuacio'];
} else {
    echo "Error: puntuacion no vàlid.";
    exit;
}

$id_usuario = $_SESSION['id_usuario'];

$fecha = date("Y-m-d H:i:s");

try {
    $connection = connectionDB();

    $sentencia_text = "INSERT INTO partida (id_usuario, id_juego, fecha, puntuacion) VALUES (:id_usuario, :id_juego, :fecha, :puntuacion);";
    $sentencia = $connection->prepare($sentencia_text);
    $sentencia->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT); // Constant corregida
    $sentencia->bindParam(':id_juego', $id_juego, PDO::PARAM_INT);
    $sentencia->bindParam(':fecha', $fecha);
    $sentencia->bindParam(':puntuacion', $puntuacion, PDO::PARAM_INT);
    $sentencia->execute();

    echo "Puntuació desada correctament.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
} finally {
    $connection = null;
}
