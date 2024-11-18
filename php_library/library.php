<?php



function openBD(){

    $servername = "localhost";
    $username = "root";
    $password = "mysql";
 
    $conn = new PDO("mysql:host=$servername;dbname=hoteles_dwes", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $conn;
}