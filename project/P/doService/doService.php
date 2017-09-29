<?php
/**
* 
*/
include_once $_SERVER['DOCUMENT_ROOT'].'/database/utils/TypeConvUtils.php';
class doService
{
    protected $procId = "";
    protected $argsArr = null;
    protected $retArr = null;
    protected $actionSrc = "";
    function __construct($paraArr)
    {
        # code...
        if(is_array($paraArr)){
            $this->procId = $paraArr[0];
            $this->argsArr = $paraArr[1];
        }
    }
    public function initDoService($paraArr){
        if(is_array($paraArr)){
            $this->procId = $paraArr[0];
            $this->argsArr = $paraArr[1];
        }
    }
    protected function parseProcId(){
        $procActionXmlSrc = $_SERVER['DOCUMENT_ROOT'].'/doService/serviceMaps/procActionMap.xml';
        $sqlMap = TypeConvUtils::getObjFromXML($procActionXmlSrc);
        $procid = $this->procId;
        $this->actionSrc = $_SERVER['DOCUMENT_ROOT'].'/'.$sqlMap->$procid->actionSrc.$sqlMap->$procid->actionName.'.php';
    }
    public function exec(){
        $this->parseProcId();
        include_once $this->actionSrc;
        handle($this->argsArr,$this->retArr);
    }
    public function getResArr(){
        return $this->retArr;
    }

    
}


?>