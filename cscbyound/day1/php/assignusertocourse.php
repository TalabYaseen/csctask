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


if ($method == "POST"){
// initail value 
$response = ['status'=>1 ,"errors"=>[]];
// // store the data in variables
$coursid = $_POST["courseid"];
$userid = $_POST["userid"];
$sql = "INSERT INTO  course_user (course_id_pov ,user_id_pov ) VALUES ('$coursid','$userid')";
$stmt =$db->prepare($sql);
$stmt->execute();
echo(json_encode("user assign successfuly"));
}