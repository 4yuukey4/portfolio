<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["error" => "not_logged_in"]);
    exit;
}

$mysqli = new mysqli("localhost", "root", "Root123!", "login_system");

$user_id = $_SESSION["user_id"];

$sql = "SELECT * FROM survey_results WHERE user_id=? ORDER BY created_at DESC";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$people = [];

while ($row = $result->fetch_assoc()) {
    $people[] = $row;
}

echo json_encode($people);
