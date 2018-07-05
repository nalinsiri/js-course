<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$contact_id = $_GET['contact'];

if(!empty($contact_id))
{
    // query select
    $sql = 'SELECT * FROM contacts WHERE id = ' . $contact_id;
    $result = $conn->query($sql);

    $contact = [];

    // fetch result to arrays
    if ($result->num_rows > 0)
    {
        // output data of each row
        while($row = $result->fetch_assoc())
        {
            array_push($contact, $row);
        }
    }

    // output as json
    header("Content-type:application/json");
    echo json_encode($contact);
}

$conn->close();
?>
