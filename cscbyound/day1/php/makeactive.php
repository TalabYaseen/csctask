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
$id =  $_POST["id"];
$sql = "UPDATE users SET status = '1' Where user_id = $id";
$stmt =$db->prepare($sql);
$stmt->execute();
echo(json_encode("Activated success"));