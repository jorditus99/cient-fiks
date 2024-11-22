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

function create_user($name, $pass)
{
    $nom = secure_data($name);
    $pass = secure_data($pass);
    $pass = hash_pass($pass);

    $connection = connectionDB();

    $stmt = $connection->prepare('Insert into usuario 
        (nom_usuario,  contrasenya) 
        VALUES  (:nom_usuario, :password)');

    $stmt->bindParam(':nom_usuario', $nom);
    $stmt->bindParam(':password', $pass);
    $stmt->execute();
}


function closeBD()
{
    return null;
}

function check_user($nom, $pass)
{   $connection = connectionDB();
    $nom = secure_data($nom);
    $stmt = $connection->prepare('SELECT * FROM usuario WHERE nom_usuario = :nom' );
    $stmt->bindParam(':nom', $nom);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC); 
    if ($result && password_verify($pass, $result['contrasenya'])) {
        return true; 
    }
    return false; 
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
