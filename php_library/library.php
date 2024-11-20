<?php



function openBD(){

    $servername = "localhost";
    $username = "root";
    $password = "mysql";
 

    $conn = new PDO("mysql:host=$servername;dbname=cientifiks", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $conn;
}

function closeBD()
{
    return null;
};

function select_usuarios()
{
    $conn = openBD();
    $sentenciaText = "select * from  usuario";

    $sentencia = $conn->prepare($sentenciaText);
    $sentencia->execute();

    $resultado = $sentencia->fetchAll();
      
      $conn = closeBD();

      return $resultado;
};

function registro_insertUsuario()
{

};

function registro_insertContrasenya()

    $conn = new PDO("mysql:host=$servername;dbname=hoteles_dwes", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $conn;
}
