<?php
/**
* 
*/
include_once $_SERVER['DOCUMENT_ROOT'].'/doService/doService.php';


$ser = new doService(['PROC000001',['username'=>'qian_js']]);
$ser->exec();

?>