<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

$contact_id =  $_GET['contact'];

if(!empty($contact_id))
{
    $sql = "DELETE FROM contacts WHERE id=" . $contact_id;

    if ($conn->query($sql) === TRUE)
    {
        $message['message'] = "Record deleted successfully";

        // output as json
        header("Content-type:application/json");
        echo json_encode($message);
    }
    else
    {
        $message['message'] = "Error deleting record: " . $conn->error;

        // output as json
        header("Content-type:application/json");
        echo json_encode($message);
    }
}

$conn->close();
?>
