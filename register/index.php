<?php
require_once 'User/UserController.php';
require_once './Helper/Mailer.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$data = $_POST;

$mailer = new Mailer;
$controller = new UserController($mailer, $data);
