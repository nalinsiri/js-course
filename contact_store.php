<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// query insert
$sql = 'INSERT INTO employees (firstname, lastname, phone, email)
        VALUES ' . '(\'' . $_POST['fname'] . '\', \'' . $_POST['lname'] .
        '\', \'' . $_POST['phone'] . '\', \'' . $_POST['email'] . '\', )';

        echo $sql;
// $result = $conn->query($sql);

$conn->close();
?>
