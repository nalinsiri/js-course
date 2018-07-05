<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// query insert
$sql = 'INSERT INTO contacts (fname, lname, phone, email)
        VALUES ' . '(\'' . $_POST['fname'] . '\', \'' . $_POST['lname'] .
        '\', \'' . $_POST['phone'] . '\', \'' . $_POST['email'] . '\' )';

if ($conn->query($sql) === TRUE)
{
    $last_id = mysqli_insert_id($conn);
    $message = [];
    $message['message'] = "Record stored successfully";
    $message['id'] = $last_id;

    // output as json
    header("Content-type:application/json");
    echo json_encode($message);
}
else
{
    echo "Error storing record: " . $conn->error;
}

$conn->close();
?>
