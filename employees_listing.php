<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// query select
$sql = 'SELECT id, fname, lname FROM employees ORDER BY id DESC';
$results = $conn->query($sql);

$employees = [];

// fetch result to arrays
if ($results->num_rows > 0)
{
    // output data of each row
    while($row = $results->fetch_assoc())
    {
        array_push($employees, $row);
    }
}

// output as json
header("Content-type:application/json");
echo json_encode($employees);

$conn->close();
?>
