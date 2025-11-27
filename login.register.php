<?php
session_start();

$mysqli = new mysqli("localhost", "root", "Root123!", "login_system");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$action = $_POST["action"];


// ---------------------- REGISTER 
if ($action === "register") {

    $username = $_POST["username"];
    $email    = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo "Konto skapat! <a href='login.register.html'>Logga in</a>";
        exit;
    } else {
        echo "Fel: " . $stmt->error;
        exit;
    }
}



// ---------------------- LOGIN (HÄR SKA DIN KOD VARA) ----------------------
if ($action === "login") {

    $username = $_POST["username"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE username=?";
    $stmt = $mysqli->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows === 1) {

        $user = $result->fetch_assoc();

        if (password_verify($password, $user["password"])) {

            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];

            // Redirect till dashboard
            header("Location: dashboard.php");
            exit;
        } 
        else {
            echo "Fel lösenord.";
        }

    } else {
        echo "Fel användarnamn.";
    }

    exit;
}

echo "Ogiltig förfrågan.";
