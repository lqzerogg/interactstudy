<?php
$router = !empty($_GET['c']) ? $_GET['c'] : 'index';
$json = !empty($_GET['js']) ? $_GET['js'] : '';

$path = str_replace("\\", '/', dirname(__DIR__) . '/');

$json_path = $path.'module/view/page/';
$view_path = $path.'view/';

if (!empty($json)) {
    //仅输出json数据内容
    $js = $json_path.$json.'.js';
    if (file_exists($js)) {
        $data = file_get_contents($js);
        header('Content-type:application/json; charset=utf-8');
        die($data);
    } else {
        die('json: '.$js.' not exists');
    }
    
} else {
    //仅输出模板内容
    $tpl = $view_path.$router.'.html';
    if (file_exists($tpl)) {
        $data = file_get_contents($tpl);
        die($data);
    } else {
        die('tpl: '.$tpl.' not exists');
    }
}