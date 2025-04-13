<?php
session_start();

// Replace this with a database in real applications
$valid_users = [
    "admin" => '$2y$10$a9LqjN1mAsKXzZ9y9zXHbeKd6Hnk9R27n.D6E6CNPPzzp7edHchFi' // secret123
];

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Simple brute-force protection
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}
if ($_SESSION['login_attempts'] >= 5) {
    $_SESSION['login_error'] = "Zu viele Login-Versuche. Versuche es später erneut.";
    header('Location: login.php');
    exit;
}

if (isset($valid_users[$username]) && password_verify($password, $valid_users[$username])) {
    $_SESSION['logged_in'] = true;
    $_SESSION['username'] = $username;
    $_SESSION['login_attempts'] = 0;
    header('Location: dashboard/dashboard.php');
    exit;
} else {
    $_SESSION['login_attempts']++;
    $_SESSION['login_error'] = "Ungültige Zugangsdaten.";
    header('Location: login.php');
    exit;
}
