<?php 
	$data = json_decode(file_get_contents("php://input"));

	$conn = new mysqli("sql107.infinityfree.com", "if0_35604074", "WLINGKsA6eWB", "if0_35604074_lab7DB");
	if ($conn->connect_error)
    	die("Connection failed: " . $conn->connect_error);
    
    $dataArray = $data->data;
    foreach ($dataArray as $item) {
    	$date = $item->date;
    	$number = $item->number;

		$sql= $conn->prepare("UPDATE messages SET localStorageDate=? WHERE number=?");
		$sql->bind_param("si", $date, $number);

		if($sql->execute())
			echo "Element from local storage saved\n";
		else
			echo "Saving error";
	}
	$conn->close();
?>