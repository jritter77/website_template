<?php
// Connect to our database (Step 2a)
$mysqli = new mysqli("localhost", "root", "", "template_db");

// Find the record (Step 2b)
if ($result = $mysqli->query("SELECT * FROM articles WHERE id = " . intval($_POST["req"])))
{
  $myArr = array();


  while ($row = $result->fetch_assoc()) {
    $myArr[] = $row;
  }

  
   // Step 2c: Display the value (this is what Javascript will see)
   echo json_encode($myArr);

   // Cleanup
   $result->free();
}
else
{
  // In case the database cannot find that record, show a message to Javascript
  echo "Not a valid record number!";
}
?>