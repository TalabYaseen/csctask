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
// divid the method to get - login and post -register
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "GET"){
    $courseid=$_GET["courseid"];
    $sql = "SELECT * FROM `users` WHERE ( users.user_id  NOT IN (SELECT user_id_pov FROM `course_user` WHERE course_id_pov = '$courseid') );";
    $stmt =$db->prepare($sql);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo(json_encode($users));
}