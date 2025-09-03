<?php

// Load PHPMailer classes
require 'vendor/phpmailer/PHPMailer.php';
require 'vendor/phpmailer/SMTP.php';
require 'vendor/phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Match these to your form fields:
    $anrede  = htmlspecialchars(trim($_POST["anrede"] ?? ''));
    $name    = htmlspecialchars(trim($_POST["name"] ?? ''));
    $email   = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["titel"] ?? ''));
    $message = htmlspecialchars(trim($_POST["nachricht"] ?? ''));

    // Basic validation
    if (empty($anrede) || empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo "Bitte füllen Sie alle Felder aus.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Ungültige E-Mail-Adresse.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP config
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'sdkistcool@gmail.com';    // Your Gmail
        $mail->Password   = '';        // Gmail app password
        $mail->Port       = 587;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // Debug & timeout
        $mail->Timeout    = 10;  // seconds
        // $mail->SMTPDebug = 2;  // Verbose debug output (disable in production)
        // $mail->Debugoutput = 'error_log';
        $mail->SMTPDebug  = 0; // recommended in production

        // Fix for some SSL issues
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer'      => false,
                'verify_peer_name' => false,
                'allow_self_signed'=> true
            ]
        ];

        // Email setup
        $mail->setFrom('sdkistcool@gmail.com', 'Website Contact Form');
        $mail->addAddress('subieheswani@gmail.com'); // Receiver

        $mail->isHTML(false);
        $mail->Subject = "Form Submission: $subject";
        $mail->Body    = "Anrede: $anrede\n"
                       . "Name: $name\n"
                       . "Email: $email\n\n"
                       . "Nachricht:\n$message";

        $mail->send();
        http_response_code(200);
        echo "Vielen Dank! Ihre Nachricht wurde versendet.";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
} else {
    http_response_code(403);
    echo "Ungültige Anfragemethode.";
}
