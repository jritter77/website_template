<?php

// Connect to our database 
$db = new SQLite3('../data/humboldtCrystals.db');

// sqlite3 command to be executed
$stmt = $db->prepare("SELECT * FROM users WHERE user = :user");

// get req params
$req = json_decode($_POST['req']);


// fill in parameters
$stmt->bindValue(':user', $req->user);


// Execute the sqlite3 command
$result = $stmt->execute();

  
// Display the value (this is what Javascript will see)
echo json_encode($result->fetchArray());


?>