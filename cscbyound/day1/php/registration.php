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
// check if username or email is exist
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
if (strlen($username) < 8){
    $usernameErr = "Username must at least be 8 char";
    $response['status'] = 0;
    array_push($response["errors"],$usernameErr);
}
if (!$response["errors"]){
// encrypt the password
$password = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (user_name ,user_email ,user_passeord) VALUES ('$username','$email','$password')";
$stmt =$db->prepare($sql);
$stmt->execute();}
echo(json_encode($response));
}



// ---------------------------------------------for login------------------------------------------------------
if ($method == "GET"){
    $email = $_GET["email"];
    $password = $_GET["password"];
    $sql = "SELECT * FROM users WHERE user_email = '$email'";
    $stmt =$db->prepare($sql);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user == []){
        echo json_encode(("wrong email"));
    }else {
        // print_r($user);
        if (! password_verify($password, $user["user_passeord"])){
            echo json_encode(("wrong password"));
        }else {
            if ( $user['is_admin'] == 1) {
                echo json_encode(( ($user)));
            }
            else  {
                if ($user['status'] == 1){
                    echo json_encode(( ($user)));}
                else
                { echo json_encode(("wait until admin active it for you")); }
            }
            
        }
    }
}
?>