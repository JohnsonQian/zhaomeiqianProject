
<?php
if(isset($GLOBALS['_POST']['file'])){
    $base_img=$GLOBALS['_POST']['file'];
$base_img = str_replace('data:image/jpeg;base64,', '', $base_img);
$base_img = str_replace('data:image/jpg;base64,', '', $base_img);

//  设置文件路径和文件前缀名称
$path = "./";
$prefix='nx_';
$output_file = $prefix.time().rand(100,999).'.jpg';
$path = $path.$output_file;
//  创建将数据流文件写入我们创建的文件内容中
$ifp = fopen( $path, "wb" );
echo $base_img;
fwrite( $ifp, base64_decode($base_img) );
fclose( $ifp );
echo "img restore done";
}else{
    echo "not receive any pics";
}

?>

