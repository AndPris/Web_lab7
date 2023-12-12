<?php 
	$conn = new mysqli("sql107.infinityfree.com", "if0_35604074", "WLINGKsA6eWB", "if0_35604074_lab7DB");
	if ($conn->connect_error)
    	die("Connection failed: " . $conn->connect_error);
    
	$sql="DELETE FROM messages";
	if($conn->query($sql))
		echo "Data deleted";
	else
		echo "Deletion error";
	$conn->close();
?>