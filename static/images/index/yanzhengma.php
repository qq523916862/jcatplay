<?php
// 创建画布
$width = 60;
$height = 26;
$img = imagecreatetruecolor($width, $height);
$black = imagecolorallocate($img, 0,0,0);
$gray = imagecolorallocate($img, 200,200,200);

// 填充背景
imageFill($img,0,0,$gray);

// 绘制验证码
$numbers = range(0,9);
$characters1 = range('a','z');
$characters2 = range('A','Z');
$characters = array_merge($characters1,$characters2);
$list = array_merge($numbers, $characters);
$n = count($list)-1;
$authnum = $_REQUEST["yzm"];
imagestring($img, 5, 10, 3, $authnum, $black);

// 加入干扰像素
for($i=0; $i<100; $i++)
{
	$randcolor = imagecolorallocate($img, rand(0,255), rand(0,255), rand(0,255));
	imagesetpixel($img, rand()%$width, rand()%$height, $randcolor);
}

// 输出
header('Content-type: image/jpeg');
imagejpeg($img);
// 释放内存
imageDestroy($img);
?>
