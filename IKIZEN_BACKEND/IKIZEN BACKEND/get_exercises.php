<?php
require 'db_connect.php';
header('Content-Type: application/json');

$stmt = $pdo->query("SELECT * FROM exercises");
echo json_encode($stmt->fetchAll());
?>