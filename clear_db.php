<?php 
	require_once 'config.php';

	$conn = new mysqli(HOST_NAME, USER_NAME, PASSWORD, DATABASE);
	
	if ($conn->connect_error)
    	die("Connection failed: " . $conn->connect_error);
    
	$sql="DELETE FROM messages";
	if($conn->query($sql))
		echo "Data deleted";
	else
		echo "Deletion error";
	$conn->close();
?>