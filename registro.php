<?php
require_once('./php_library/library.php');

if (isset($_POST['nom']) && isset($_POST['password']) && isset($_POST['confirm-password'])) {
    // print_r($_POST['password']);
    // die();
    if ($_POST['password'] === $_POST['confirm-password']) {
        create_user($_POST['nom'], $_POST['password'], $_POST['id_tipo']);
        header("Location: ./log_in.php");
    } else {
        echo "Las contraseñas no coinciden.";
    }
}
?>



<!DOCTYPE html>
<html lang="es">

<head>
    <title>Registrarse - Anna i el misteri de les tres fonts</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css">
</head>

<style>
    .master-container-register {
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container-register {
        display: flex;
        flex-direction: column;
        height: 85%;
        background-color: rgba(255, 255, 255, 0.78);
        width: 37%;
        border-radius: 20px;
    }

    .container-title-register {
        height: 20%;
        text-align: center;
        text-shadow: 3px 3px 5px #000000;
    }

    .container-form {
        height: 75%;
        display: flex;
        justify-content: center;
        width: auto;
        margin: 5%;
    }

    .form-register {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    .continer-inputs {
        display: flex;
        flex-direction: column;
        width: 75%;
        justify-content: space-around;
        height: 70%;
    }

    .container-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input {
        height: 25%;
        border-radius: 8px;
        border-color: #CCCCCC;
        margin-bottom: 10px;
    }

    .register-button {
        background-color: #06629E;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-size: 1.2em;
        cursor: pointer;
    }
</style>

<body>

    <div class="navbar">
        <div class="navbar-content">
            <div class="nav-links">
                <a href="index.html">Inici</a>
                <a href="jocs.html">Jocs</a>
                <a href="ranquing.php">Rànquing</a>
                <a href="equipo.html">Equip</a>
            </div>
        </div>
    </div>



    <div class="master-container-register">
        <div class="container-register">
            <div class="container-title-register">
                <h1>Registrarse</h1>
            </div>
            <div class="container-form">
                <form action="" method="POST" class="form-register">
                    <div class="continer-inputs">
                        <input type="text" id="nom" name="nom" placeholder="Nombre de usuario" required>
                        <input type="password" id="password" name="password" placeholder="Crear contraseña" required>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Repetir contraseña" required>
                        <input type="hidden" id="id_tipo" name="id_tipo" value="3">
                    </div>
                    <div class="container-buttons">
                        <button type="submit" class="register-button">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>

</html>