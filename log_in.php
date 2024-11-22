<?php
require_once('./php_library/library.php');

if(isset($_POST['nom']) && isset ($_POST['password'])){
$resultAuth = auth_user($_POST['nom'], $_POST['password']);
if(!$resultAuth){
    header('Location: error.php');
}else{
    header('Location: error.php');
}
}


?>


<!DOCTYPE html>
<html lang="es">

<head>
    <title>Anna i el misteri de les tres fonts</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/modern-normalize@2.0.0/modern-normalize.min.css">
</head>

<style>
    .master-container-log-in {
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container-log-in {
        display: flex;
        flex-direction: column;
        height: 85%;
        background-color: rgba(255, 255, 255, 0.78);
        /* Fondo blanco con 78% de opacidad */
        width: 37%;
        border-radius: 20px;
    }

    .container-title-log-in {
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

    .form-log-in {
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
        height: 55%;

    }


    .container-buttons {
        display: flex;
        flex-direction: column;
        width: 65%;
        align-items: center;
        justify-content: space-around;

    }

    .continer-buttons-top {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    input {
        height: 30%;
        border-radius: 8px;
        border-color: #CCCCCC;

    }

    .regis-button {
        background-color: #06629E;
    }

    .big-button {
        width: 100%;
        background-color: #06629E;
    }

    a {
        text-decoration: none;
        color: #CCCCCC;
    }
</style>

<body>

    <div class="hero">


        <div class="navbar">
            <div class="navbar-content">
                <div class="nav-links">
                    <a href="index.html">Inici</a>
                    <a href="jocs.html">Jocs</a>
                    <a href="ranquing.html">Rànquing</a>
                    <a href="equipo.html">Equip</a>
                </div>
            </div>
        </div>
    </div>

    <div class="master-container-log-in">
        <div class="container-log-in">
            <div class="container-title-log-in">
                <h1>Iniciar Sesión</h1>
            </div>
            <div class="container-form">
                <form action="" method="POST" class="form-log-in">
                    <div class="continer-inputs">
                        <input type="text" id="nombre" name="nombre" placeholder="Nombre de usuario">
                        <input type="password" id="password" name="password" placeholder="Contraseña">
                    </div>
                    <div class="container-buttons">
                        <div class="continer-buttons-top">
                            <button type="submit">Acceder</button>
                            <button class="regis-button"><a href="/registro.html">Registrarse</a></button>
                        </div>
                        <button class="big-button"><a href="/jocs.html">Jugar sin Iniciar Sesión</a></button>
                    </div>

                </form>

            </div>
        </div>
    </div>




</body>

</html>