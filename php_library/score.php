<?php   


require_once('library.php');


$connection = connectionDB();

$sentencia_text = "SELECT 
    u.nom_usuario AS usuari,
    SUM(max_p.puntuacion_max) AS puntuacio_total
FROM 
    usuario u
JOIN (
    SELECT 
        p.id_usuario,
        p.id_juego,
        MAX(p.puntuacion) AS puntuacion_max
    FROM 
        partida p
    GROUP BY 
        p.id_usuario, p.id_juego
) max_p 
ON 
    u.id_usuario = max_p.id_usuario
GROUP BY 
    u.id_usuario";

$sentencia = $connection->prepare($sentencia_text);

$resultat = $sentencia->fetchAll();
$connection = null