<?php
session_start();

// Replace this with a database in real applications
$valid_users = [
    "admin" => '$2a$12$1ix5B9.vBqOhP6eV9dLv2uB1NQ7GUDncbg4V6Vy8tK23MN6SqRM.6' // secret123
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
    header('Location: dashboard.php');
    exit;
} else {
    $_SESSION['login_attempts']++;
    $_SESSION['login_error'] = "Ungültige Zugangsdaten.";
    header('Location: login.php');
    exit;
}
