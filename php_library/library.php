<?php



function connectionDB(){

    $servername = "localhost";
    $username = "root";
    $pass = "mysql";
 
    try{
    $connection = new PDO("mysql:host=$servername;dbname=cientifiks", $username, $pass);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;

    }  catch (PDOException $e){
        die('Error: '.$e->getMessage());
    } 
    }


    function secure_data($data){
    
        // trim quita los espacios,  strip quita las comillas 
        // y html subnota caracteres especiales
        
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        
        return $data;
    
    }


    function hash_pass($pass){
        return password_hash($pass, PASSWORD_DEFAULT);
    }

    function create_user($name, $pass){
        $nom = secure_data($name);
        // $pass = secure_data($pass);
        // $pass = hash_pass($pass);

        $connection = connectionDB();

        $stmt = $connection->prepare('Insert into usuario 
        (nom_usuario,  contrasenya) 
        VALUES  (:nom_usuario, :password)');

         $stmt->bindParam(':nom_usuario', $nom);
         $stmt->bindParam(':password', $pass);
         $stmt->execute();

         $connection = closeBD();
    }

    
function closeBD()
{
    return null;
};





