<?php 
	$conn = new mysqli("sql107.infinityfree.com", "if0_35604074", "WLINGKsA6eWB", "if0_35604074_lab7DB");
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