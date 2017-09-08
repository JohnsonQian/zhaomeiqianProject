<?php
/**
* proc000001Handler
* 用于查询用户名是否已经被注册过
*/
include_once $_SERVER['DOCUMENT_ROOT'].'/database/utils/dbProc.php';
function handle($argsArr,&$retArr){
    $name = $argsArr['username'];
    $dbp = new dbProc(['createUser.checkUserNameIfReg',['$user_name'=>$name]]);
    $dbp->exec();
    $retArr = $dbp->getQryRes();
}

?>