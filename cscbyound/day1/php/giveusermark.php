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
$mark = $_POST["mark"];
$sql = "UPDATE course_user SET `user_mark` = '$mark' WHERE (course_id_pov = '$coursid'  AND user_id_pov = '$userid') ";
$stmt = $db->prepare($sql);
if ($stmt->execute() == 1){
    echo(json_encode("Mark assign successfuly"));
}else {
    echo(json_encode("Mark Not assign"));
}


}