<?php
// если получили JSON то декодируем его в нужный формат
$_POST = json_decode(file_get_contents('php://input'), true);
echo var_dump($_POST);
// плучает данные от клиента, превращает их в строку и возвращает их клиенту
?>