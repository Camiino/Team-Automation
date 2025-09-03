<?php
header('Content-Type: application/javascript');
// Read from environment (docker/.env). Fallback to default if not set.
$baseUrl = getenv('BASE_URL') ?: 'https://bee-its.de';
// Basic escape for JS embedding
$baseUrlJs = htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8');
?>
// Auto-generated config from environment variables
window.BASE_URL = "<?php echo $baseUrlJs; ?>";



