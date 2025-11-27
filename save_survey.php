<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    header("Location: login.register.html");
    exit;
}

$mysqli = new mysqli("localhost", "root", "Root123!", "login_system");

if ($mysqli->connect_error) {
    die("Database error");
}

$user_id     = $_SESSION["user_id"];
$person_name = $_POST["person_name"];
$vision      = $_POST["vision"];
$color       = $_POST["color"];
$reaction    = $_POST["reaction"];

$sql = "INSERT INTO survey_results (user_id, person_name, vision, color_test, reaction_time)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("isdss", $user_id, $person_name, $vision, $color, $reaction);

$stmt->execute();

header("Location: dashboard.html");
exit;
