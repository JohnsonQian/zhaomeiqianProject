<?php
include_once  $_SERVER['DOCUMENT_ROOT'].'/database/utils/dbUtils.php';
class dbProc extends dbUtils
{
 private $mapDotSql = '';
 private $sqlId = "";
 private $mapName = '';
 private $dbName = "";
 private $sql = "";
 private $valObj = "";
 private $qryRes = null;
 private $qryArgArr = null;

  function __construct($paraArr){
    if(is_array($paraArr)){
        $this->log =$this->log.'----dbProc construct para:'.$paraArr[0]."\n";
        $this->mapDotSql = $paraArr[0];
        if(isset($paraArr[1])){
            $this->qryArgArr = $paraArr[1];
        }
    }else if(is_string($paraArr)){
        $this->log =$this->log.'----dbProc construct para:'.$paraArr."\n";
        $this->mapDotSql = $paraArr;
    }else{
        die("dbProc construct error: Args not array or String!");
    }
 }

 public function sqlParse(){
    $this->log = $this->log.'----sqlParse()----';
    if(substr_count($this->mapDotSql, '.')==1){
        $str_arr = explode('.', $this->mapDotSql);
        $this->mapName = $str_arr[0];
        $this->sqlId = $str_arr[1];
        $this->log =$this->log. 'SQLMAPNAME:'.$this->mapName;
        $this->log =$this->log. '----SQLID:'.$this->sqlId."\n";
    }else{
        $this->log = $this->log ."sqlParse error:cannot get mapname and sqlid\n";
        die("sqlParse error");
    }
 }

 private function getSqlFromXML(){
    $this->log = $this->log."----getSqlFromXML()\n";
    $sqlMapXmlSrc = $_SERVER['DOCUMENT_ROOT'].'/database/sqlMaps/'.$this->mapName.'.xml';
    $sqlMap = TypeConvUtils::getObjFromXML($sqlMapXmlSrc);
    $this->dbName = $sqlMap->dbName;
    $sqlid = $this->sqlId;
    $this->sql = $sqlMap->$sqlid;
    $this->insteadArgsInSql();
 }

 protected function insteadArgsInSql(){
    if(!is_null($this->qryArgArr)){
        foreach ($this->qryArgArr as $key => $value) {
            $this->sql = str_replace($key, $value, $this->sql);
        }
        $this->log =$this->log. 'SQLAfterInsteadArgs:'.$this->sql;
    }
 }

 public function exec(){
    $this->log = $this->log."----exec()\n";
    $this->sqlParse();
    $this->getSqlFromXML();
    $this->startProc();

 }
 protected function execSql(){
    $selectRes = mysqli_select_db($this->conn, $this->dbName);
    $retVal = mysqli_query($this->conn, $this->sql);
    if(is_bool($retVal)){
        $this->qryRes = $retVal;
    }else if(is_object($retVal)){
         $this->qryRes = array();
        if (mysqli_num_rows($retVal) > 0) {
            // 输出数据
            while($row = mysqli_fetch_assoc($retVal)) {
                array_push($this->qryRes, $row);
            }
        }
    }
 }

protected function startProc(){
$this->log = $this->log."----startProc()\n";
$this->dbConnect();
$this->execSql();
$this->destroyConn();
}

public function getQryRes(){
    return $this->qryRes;
}

public function getLog(){
    echo "$this->log";
}

}

/*
使用方法：
$dbp = new dbProc(['sqlMapOne.sqltwo',['$a'=>1,'$b'=>2]]);
$dbp->exec();
$res = $dbp->getQryRes();
*/
?>