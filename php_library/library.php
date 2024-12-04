<?php

function connectionDB()
{

    $servername = "localhost";
    $username = "root";
    $pass = "mysql";

    try {
        $connection = new PDO("mysql:host=$servername;dbname=cientifiks", $username, $pass);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    } catch (PDOException $e) {
        die('Error: ' . $e->getMessage());
    }
}

function secure_data($data)
{

    // trim quita los espacios,  strip quita las comillas 
    // y html subnota caracteres especiales

    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

function hash_pass($pass)
{
    return password_hash($pass, PASSWORD_DEFAULT);
}

function create_user($name, $pass, $id_type)
{
    $nom = secure_data($name);
    $pass = secure_data($pass);
    $pass = hash_pass($pass);
    $id_type = secure_data($id_type);

    $connection = connectionDB();

    $stmt = $connection->prepare('Insert into usuario 
        (nom_usuario,  contrasenya, id_tipo) 
        VALUES  (:nom_usuario, :password, :id_tipo)');

    $stmt->bindParam(':nom_usuario', $nom);
    $stmt->bindParam(':password', $pass);
    $stmt->bindParam(':id_tipo', $id_type);
    $stmt->execute();

    $connection = null;
}


function check_user($nom, $pass)
{   $connection = connectionDB();
    $nom = secure_data($nom);
    $stmt = $connection->prepare('SELECT * FROM usuario WHERE nom_usuario = :nom' );
    $stmt->bindParam(':nom', $nom);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC); 
    if ($result && password_verify($pass, $result['contrasenya'])) {
        return $result["id_usuario"]; 
    }
    return -1; 

    $connection = null;
}

function add_id ($user_type){
    
    $connection = connectionDB();
    $user_type = secure_data($user_type);
    $stmt = $connection->prepare('Insert into usuario 
    (id_tipo) 
    VALUES  (:user_type)'); 
    $stmt->bindParam(':id_tipo', $user_type);
    $stmt->execute();

    $connection = null;

}
    
function select_usuaris(){

    $connection = connectionDB();
    $sentencia_text = "SELECT * FROM usuario";
    $sentencia = $connection->prepare($sentencia_text);
    $sentencia->execute();
    $resultat = $sentencia->fetchAll();

    $connection = null;

    return $resultat;
}


function selsect_puntuacio(){

}


function afegir_puntuacio(){

}




// function get_pass($nom)
// {
//     $nom = secure_data($nom);
//     $connection = connectionDB();
//     $stmt = $connection->prepare('SELECT nom_usuario, contrasenya FROM usuario WHERE nom_usuario = :nom');
//     $stmt->bindParam('nom', $nom);
//     $stmt->execute();

//     $result = $stmt->fetch();

//     return $result['contrasenya'];
// }

// function auth_user($nom, $password)
// {
//     $nom = secure_data($nom);
//     $password = secure_data($password);

//     if (check_nom($nom)) {
//         $passInDB = get_pass($nom);
//         $resultAuth = password_verify($password, $passInDB);
//         return $resultAuth;
//     }
// }
