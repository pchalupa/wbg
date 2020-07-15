<?php

define('HOST', 'uvdb42.active24.cz');
define('DB', 'wbgcz');
define('USER', 'wbgcz');
define('PASS', 'o3oRgQ2AEC');

class UserModel{
	private $pdo;

	function __construct(){
		$host = HOST;
		$db   = DB;
		$user = USER;
		$pass = PASS;
		$charset = 'utf8mb4';

		$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
		$options = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false,
		];
		try {
			$this->pdo = new PDO($dsn, $user, $pass, $options);
		} catch (\PDOException $e) {
			throw new \PDOException($e->getMessage(), (int)$e->getCode());
		}
	}

	public function insert($rawData){
		$data = [
			'name' => (isset($rawData['name']) && $rawData['name']) ? $rawData['name'] : null,
			'surname' => (isset($rawData['surname']) && $rawData['surname']) ? $rawData['surname'] : null,
			'sex' => (isset($rawData['sex']) && $rawData['sex']) ? $rawData['sex'] : null,
			'street' => (isset($rawData['street']) && $rawData['street']) ? $rawData['street'] : null,
			'city' => (isset($rawData['city']) && $rawData['city']) ? $rawData['city'] : null,
			'email' => (isset($rawData['email']) && $rawData['email']) ? $rawData['email'] : null,
			'phone' => (isset($rawData['telephone']) && $rawData['telephone']) ? $rawData['telephone'] : null,
		];
			$sql = "INSERT INTO users (name, surname, sex, street, city, email, phone) VALUES (:name, :surname, :sex, :street, :city, :email, :phone)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute($data);
	}

}