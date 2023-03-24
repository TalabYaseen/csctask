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
// store the data in variables
$coursename = $_POST["coursename"];
$minmark = $_POST["minmark"];

// 
$sql = "SELECT * FROM courses";
$stmt =$db->prepare($sql);
$stmt->execute();
$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($courses as $value) {
    if ($value["course_name"] == $coursename) {
        array_push($response["errors"],"course already exist");
        $response['status'] = 0;
    }
  }
// 
if (!$response["errors"]){
$sql = "INSERT INTO courses (course_name ,course_min_mark ) VALUES ('$coursename','$minmark')";
$stmt =$db->prepare($sql);
$stmt->execute();}
echo(json_encode($response));
}