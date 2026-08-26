<?php
require 'db_connect.php';
header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$new_password = password_hash($_POST['new_password'] ?? '', PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare('UPDATE users SET password = ? WHERE email = ?');
    $stmt->execute([$new_password, $email]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'User not found']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>