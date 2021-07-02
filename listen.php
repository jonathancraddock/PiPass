<?php
//call 'listen.sh' and expect 'ok'

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $status = shell_exec("./listen.sh");
  if ( $status == 'ok' ) { echo 'ok'; }
}

?>
