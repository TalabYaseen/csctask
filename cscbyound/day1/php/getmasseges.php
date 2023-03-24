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
$user_id = $_GET["userid"];
$freind_id = $_GET["freindid"];
$sql = " SELECT * FROM `masseges` WHERE (sender_id = $user_id AND receiver_id = $freind_id) OR (sender_id = $freind_id AND receiver_id = $user_id) ORDER BY send_at ;";
$stmt =$db->prepare($sql);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo(json_encode($users));