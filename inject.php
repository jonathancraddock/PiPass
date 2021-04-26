<?php

//read password from JSON file
$passwordFile = file_get_contents("passwords.json");
$passwordArray = json_decode($passwordFile, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  //read asset number
  $asset = $_POST['asset'];
  if (empty($asset)) {
    echo "No Asset";
  } else {
    //send password to inject shell script
    $result = shell_exec("./inject.sh ".$passwordArray[$asset]);
    if (strpos($result, 'null') !== false) {$status=$passwordArray[$asset]." -> OK";} else {$status="Injection Failed";}
    //reply to jquery function
    echo $status;
  }
}

?>
