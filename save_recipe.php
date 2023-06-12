<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
// Set character set for Korean language support
mysqli_set_charset($conn, 'utf8');


$servername = "localhost";
$username = "ksi";
$password = "1234";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

$recipeName = $data["recipeName"];
$cookingTime = $data["cookingTime"];
$ingredients = $data["ingredients"];
$cost = $data["cost"];
$description = $data["description"];

// Prepare and bind statement
$stmt = $conn->prepare("INSERT INTO recipes (recipeName, cookingTime, ingredients, cost, description) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $recipeName, $cookingTime, $ingredients, $cost, $description);

// Execute statement
$result = $stmt->execute();

if ($result === TRUE) {
    $response = array("status" => "success");
} else {
    $response = array("status" => "error", "message" => $stmt->error);
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
