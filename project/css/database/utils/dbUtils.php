<?php
/**
* 数据库操作类
*/
include_once $_SERVER['DOCUMENT_ROOT'].'/database/utils/TypeConvUtils.php';
abstract class dbUtils
{
    protected $conn = null;
    public $log = "";
    protected function dbConnect()
    {
        $DBCONF_URL = $_SERVER['DOCUMENT_ROOT'].'/database/conf/dbConf.xml';
        # code...
        $dbConf = TypeConvUtils::getObjFromXML($DBCONF_URL);
        $dbuser = $dbConf->loginUsers->rootUser->userName;
        $dbpass = $dbConf->loginUsers->rootUser->pwd;
        $dbhost = $dbConf->host;
        $this->conn = mysqli_connect($dbhost, $dbuser, $dbpass);
        if(!$this->conn){
            $this->log = $this->log.'----CONNECTDBfail: ' . mysqli_error($this->conn)."\n";
            die();
        }
         $this->log = $this->log."----CONNECTDBsuccess\n";
    }
    abstract function exec();
    protected function selectdb($dbName){
        mysqli_select_db($thhis->conn,$dbName);
    }
    protected function destroyConn(){
        if($this->conn){
            $this->log = $this->log."----DESTROYDBCONNECTsuccess\n";
            mysqli_close($this->conn);
        }
    }
}
?>