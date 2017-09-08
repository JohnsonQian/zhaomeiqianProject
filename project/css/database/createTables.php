<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/database/utils/dbProc.php';

$dbp = new dbProc('createtables.createLogintable');
$dbp->exec();
if($dbp->getQryRes()){
    echo "1.LOGIN_TABLE create success!";
}

$dbp = new dbProc('createtables.createLocationinfotable');
$dbp->exec();
if($dbp->getQryRes()){
    echo "\n2.LOCATION_INFO create success!\n";
}

$dbp = new dbProc('createtables.createuserinfotable');
$dbp->exec();
if($dbp->getQryRes()){
    echo "\n3.USER_INFO create success!";
}

$dbp = new dbProc('createtables.createDishDetailTable');
$dbp->exec();
if($dbp->getQryRes()){
    echo "\n4.DISH_DETAIL create success!";
}

$dbp = new dbProc('createtables.createDishInfoTable');
$dbp->exec();
if($dbp->getQryRes()){
    echo "\n5.DISH_INFO create success!";
}



?>