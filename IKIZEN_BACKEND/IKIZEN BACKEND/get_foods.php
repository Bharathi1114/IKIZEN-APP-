<?php
require 'db_connect.php';
header('Content-Type: application/json');

$diet = $_GET['diet'] ?? 'veg_foods';
$allowed_tables = ['veg_foods', 'non_veg_foods', 'vegan_foods', 'keto_foods'];

if (!in_array($diet, $allowed_tables)) {
    $diet = 'veg_foods';
}

$stmt = $pdo->query("SELECT * FROM $diet");
echo json_encode($stmt->fetchAll());
?>