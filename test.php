<?php
// Load environment variables from .env file
function loadEnv() {
    $envFile = __DIR__ . '/.env';
    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, '#') === 0) {
                continue;
            }

            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);
            
            if (!empty($name)) {
                putenv("$name=$value");
                $_ENV[$name] = $value;
            }
        }
    }
}

// Load environment variables
loadEnv();

// Database connection using environment variables
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$pass = getenv('DB_PASSWORD');
$db = getenv('DB_NAME');

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