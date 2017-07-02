<?php
/*
传入url路径，返回文件字符串形式内容
 */
function readFileBySrc($fileSrc){
    $myfile = fopen($fileSrc, "r") or die("Unable to open file".$fileSrc);
    $fileData = fread($myfile,filesize($fileSrc));
    fclose($myfile);
    return $fileData;
}

/*
传入json格式文件路径，返回解析后的数组，或者对象,默认为返回数组
 */
function getArrayFromJsonTxtFileSrc($fileSrc, $ifReturnArray=true){
    if(true == $ifReturnArray||"1" == $ifReturnArray){
        $imgArrayjson = json_decode(readFileBySrc($fileSrc),true);
    }else{
        $imgArrayjson = json_decode(readFileBySrc($fileSrc),false);
    }
    return $imgArrayjson;
}

function testFunction(){
    echo "hello"; //zhushi
}

function branchwto(){
    echo "hello"; //zhushi
}


?>