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



// --------------------------------------------for register---------------------------------------------------
if ($method == "POST"){
// initail value 
$response = ['status'=>1 ,"errors"=>[]];
// store the data in variables
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
$conpassword = $_POST["conpassword"];
// check the email if valid
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $emailErr = "Invalid Email";
  $response['status'] = 0;
  array_push($response["errors"],$emailErr);
}
// check the password if valid 1 uppercase 1 lowercase 1 digit 1 spicialchar at least 8 digit long
$password_reg = "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/" ;
preg_match($password_reg, $password, $passpassword);
if(!$passpassword){
    $passwordErr = "Invalid pssword make it stronger";
    $response['status'] = 0;
    array_push($response["errors"],$passwordErr);
};
// check the conpassword if matches the password
if ($password !== $conpassword){
    $conpasswordErr = "your pssword didn't match";
    $response['status'] = 0;
    array_push($response["errors"],$conpasswordErr);
}
// check if user enter something as username
if (strlen($username) < 8 ){
    $usernameErr = "Username must at least be 8 char";
    $response['status'] = 0;
    array_push($response["errors"],$usernameErr);
}
// check username and email 
$sql = "SELECT * FROM users";
$stmt =$db->prepare($sql);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($users as $value) {
    if ($value["user_name"] == $username) {
        array_push($response["errors"],"User name is taken");
        $response['status'] = 0;
    }
    if ($value["user_email"] == $email) {
        array_push($response["errors"],"email already exists");
        $response['status'] = 0;
    }
  }
if (!$response["errors"]){
// encrypt the password
$password = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (user_name ,user_email ,user_passeord,status) VALUES ('$username','$email','$password','1')";
$stmt =$db->prepare($sql);
$stmt->execute();}
echo(json_encode($response));
}