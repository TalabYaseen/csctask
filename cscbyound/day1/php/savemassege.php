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
// print_r($_POST);
$msg = $_POST["msg"];
$userid = $_POST["userid"];
$sendto = $_POST["sendto"];

$sql = "INSERT INTO  masseges (sender_id ,receiver_id ,content) VALUES ('$userid','$sendto','$msg')";
$stmt =$db->prepare($sql);
$stmt->execute();
echo(json_encode("sent"));
