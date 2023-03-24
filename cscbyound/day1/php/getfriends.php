<?php

header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json;");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

// make connection with database
$id = $_GET["id"];
include_once './config.php';
$database = new DB();
$db = $database->getConnection();
$sql = "SELECT distinct * FROM `users` WHERE (users.user_id IN (SELECT user_id_pov FROM `course_user` WHERE ( course_id_pov IN (SELECT course_id_pov FROM `course_user` WHERE user_id_pov = $id)))) AND users.user_id <>$id UNION ALL
SELECT * FROM users WHERE users.is_admin = 1 ;";
$stmt =$db->prepare($sql);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($users));