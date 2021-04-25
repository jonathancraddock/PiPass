<?php

//read passwords from JSON file
$passwordFile = file_get_contents("passwords.json");
$passwordArray = json_decode($passwordFile, true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  //read asset number
  $asset = $_POST['asset'];
  if (empty($asset)) {
    echo "No Asset";
  } else {
    //send password to inject shell script
    shell_exec("./inject.sh ".$passwordArray[$asset]);
    //reply to jquery function
    echo json_encode( "Injecting- ".$passwordArray[$asset]." -end" );
  }
}

?>
