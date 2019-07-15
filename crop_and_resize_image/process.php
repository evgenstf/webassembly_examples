<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['data'])) {
    $ptr = fopen('files/'.$_POST['filename'], 'wb');
    foreach ($_POST['data'] as $num) {
      fwrite($ptr, pack('C', $num));
    }
    fclose($ptr);
  }
}

?>
