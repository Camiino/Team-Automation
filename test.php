<?php

// Database connection using environment variables
$host = "db";
$user = "newsadmin";
$pass = "Yourpassword123!";
$db = "newsdb";

try {
    $conn = new mysqli($host, $user, $pass, $db);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    echo "<h1>Database Connection Successful!</h1>";
    
    // Test query
    $result = $conn->query("SELECT * FROM news");
    
    if ($result->num_rows > 0) {
        echo "<h2>News Articles:</h2>";
        echo "<ul>";
        while($row = $result->fetch_assoc()) {
            echo "<li><strong>" . $row["title"] . "</strong> (" . $row["date"] . ")</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No news articles found in the database.</p>";
    }
    
    $conn->close();
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>