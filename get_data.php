<?php
	require_once 'config.php';

	$conn = new mysqli(HOST_NAME, USER_NAME, PASSWORD, DATABASE); 

	if ($conn->connect_error)
    	die("Connection failed: " . $conn->connect_error);

	$sql="SELECT number, date, localStorageDate, message FROM messages ORDER BY number;";

	$result = $conn->query($sql);
	$conn->close();

	if($result) {
		$data = array();
		while ($row = $result->fetch_assoc()) {
		    $data[] = $row;
		}
	} else
		die("Selection error");

	header('Content-Type: application/json');
	echo json_encode($data);
?>