<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

// query update
$sql = "UPDATE contacts SET fname = '" . $_POST['fname'] . "', lname = '" . $_POST['lname'] . "', " .
        "phone = '" . $_POST['phone'] . "', email = '" . $_POST['email'] . "'" . " WHERE id = " . $_POST['id'];

if ($conn->query($sql) === TRUE)
{
    echo "Record updated successfully";
}
else
{
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
