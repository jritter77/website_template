<?php
// Connect to our database (Step 2a)
$db = new SQLite3('../data/humboldtCrystals.db');

// Find the record (Step 2b)
$results = $db->query("SELECT * FROM catalog");

$myArr = array(); 

while ($row = $results->fetchArray()) {
  array_push($myArr, $row);
}

  
   // Step 2c: Display the value (this is what Javascript will see)
   echo json_encode($myArr);

?>