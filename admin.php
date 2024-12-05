<?php

require_once("php_library/library.php");

$usuaris = select_usuaris();

?>


<!DOCTYPE html>
<html lang="es">

<head>
    <title>Anna i el misteri de les tres fonts</title>
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</head>

<body>

    <div class="navbar">
        <div class="navbar-content">
            <div class="nav-links">
                <a href="index.html" class="active">Inici</a>
                <a href="jocs.html">Jocs</a>
                <a href="ranquing.php">Rànquing</a>
                <a href="credits.html">Equip</a>
            </div>
        </div>
    </div>

    <div class="container">
        <table class="table">
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nom usuari</th>
                <th scope="col">Contrasenya</th>
                <th scope="col">Tipus usuari</th>
                <th scope="col">Joc actual</th>
            </tr>
            <?php foreach ($usuaris as $usuari) { ?>
                <tr>
                    <td><?php echo $usuari['id_usuario'] ?></td>
                    <td><?php echo $usuari['nom_usuario'] ?></td>
                    <td><?php echo $usuari['contrasenya'] ?></td>
                    <td><?php echo $usuari['id_tipo'] ?></td>
                    <td><?php echo $usuari['id_juego_actual'] ?></td>
                    <td><button class="btn btn-primary">Editar</button></td>
                    <td><button class="btn btn-danger">Eliminar</button></td>
                </tr>
            <?php } ?>
        </table>
    </div>




</body>

</html>