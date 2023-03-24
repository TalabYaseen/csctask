<?php

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

// make connection with database
include_once './config.php';
$database = new DB();
$db = $database->getConnection();
$userid = $_GET["id"];

$sql = "SELECT * FROM `course_user` INNER JOIN courses ON courses.course_id =course_user.course_id_pov WHERE user_id_pov = $userid ;"; 
$stmt =$db->prepare($sql);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($users));