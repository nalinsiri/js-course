<?php
require_once 'config/config.php';

// make connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$employee_id = $_GET['employee'];

if(!empty($employee_id))
{
    // query select
    $sql = 'SELECT * FROM employees WHERE id = ' . $employee_id;
    $result = $conn->query($sql);

    $employee = [];

    // fetch result to arrays
    if ($result->num_rows > 0)
    {
        // output data of each row
        while($row = $result->fetch_assoc())
        {
            array_push($employee, $row);
        }
    }

    // output as json
    header("Content-type:application/json");
    echo json_encode($employee);
}

$conn->close();
?>
