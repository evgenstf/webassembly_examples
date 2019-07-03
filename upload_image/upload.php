	<?php 
if(isset($_POST['upload'])){
    //Список разрешенных файлов
    $whitelist = array(".gif", ".jpeg", ".jpg", ".png");         
    $data = array();
    $error = true;
    
    //Проверяем разрешение файла
    foreach  ($whitelist as  $item) {
      if(preg_match("/$item\$/i",$_FILES['userfile']['name'])) $error = false;
    }

    //если нет ошибок, грузим файл
    if(!$error) { 
        $folder =  'files/';//директория в которую будет загружен файл
        $uploadedFile =  $folder.basename($_FILES['userfile']['name']);
        if(is_uploaded_file($_FILES['userfile']['tmp_name'])){
            if(move_uploaded_file($_FILES['userfile']['tmp_name'],$uploadedFile)){
                $data = $_FILES['userfile'];
            }
            else {    
                $data['errors'] = "Error while uploading";
            }
        }
        else {    
            $data['errors'] = "File not uploaded";
        }
    }
    else{
        $data['errors'] = "Wrong file extension";
    }
    
    
    //Формируем js-файл    
    $res = '<script type="text/javascript">';
    $res .= "var data = new Object;";
    foreach($data as $key => $value){
        $res .= 'data.'.$key.' = "'.$value.'";';
    }
    $res .= 'window.parent.handleResponse(data);';
    $res .= "</script>";
    
    echo $res;

}
else{
    die("ERROR");
}

?>
