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
$response = ['status'=>1 ,"errors"=>[]];
$username = $_POST["username"];
$email = $_POST["email"];
$id = $_POST["id"];
// check if username or email is exist
$sql = "SELECT * FROM users Where user_id  <> $id";
$stmt =$db->prepare($sql);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($users as $value) {
    if ($value["user_name"] == $username) {
        array_push($response["errors"],"User name is taken");
        $response['status'] = 0;
    }
    if (strlen($username) < 8) {
        array_push($response["errors"],"Username must at least be 8 char");
        $response['status'] = 0;
    }
    if ($value["user_email"] == $email) {
        array_push($response["errors"],"email already exists");
        $response['status'] = 0;
    }
  }
if ($response['status'] ==1){
    $sql = "UPDATE users SET user_name = '$username' , user_email= '$email' Where user_id = $id";
    $stmt =$db->prepare($sql);
    $stmt->execute();
    echo(json_encode($response));
}else {
    echo(json_encode($response));
}
