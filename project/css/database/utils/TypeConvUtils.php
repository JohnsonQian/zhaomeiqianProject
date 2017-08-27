<?php

/**
* json xml数据转换方法类
*/
class TypeConvUtils
{
 /*读文件用
 *传入url路径，返回文件字符串形式内容
 */
    static function readFileBySrc($fileSrc){
        $myfile = fopen($fileSrc, "r") or die("Unable to open file".$fileSrc);
        $fileData = fread($myfile,filesize($fileSrc));
        fclose($myfile);
        return $fileData;
    }

/*
传入json格式文件路径，返回解析后的数组，或者对象,默认为返回数组
 */
    static function getArrayFromJsonTxtFileSrc($fileSrc, $ifReturnArray=true){
        if(true == $ifReturnArray||"1" == $ifReturnArray){
            $arrayFromjson = json_decode(readFileBySrc($fileSrc),true);
        }else{
            $arrayFromjson = json_decode(readFileBySrc($fileSrc),false);
        }
        return $arrayFromjson;
    }

/*
传入XML格式文件路径，返回解析后的对象
 */
    static function getObjFromXML($XMLfileSrc){
        if(file_exists($XMLfileSrc)){
            $xmls = simplexml_load_file($XMLfileSrc);
            return $xmls;
        }
        else{
            $errStr = 'cannot find file:'.$XMLfileSrc;
            echo 'console.log('.$errStr.')';
            return null;
        }
    }   
 



}
?>