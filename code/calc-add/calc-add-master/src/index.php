<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
require('functions.inc.php');


$error = false;
$string = "";
$answer = 0;
$x = $_REQUEST['x'];
$y = $_REQUEST['y'];


if ($x == null && $y == null) {
	$error = true;
	$string = "X and Y are null";
	$answer = 0;
} elseif ($x == null) {
	$error = true;
	$string = "X is null";
	$answer = 0;
} elseif ($y == null) {
	$error = true;
	$string = "Y is null";
	$answer = 0;
} else {
    if (is_numeric($y)) {
		$answer=add($x,$y);
		$string=$x."+".$y."=".$answer;
    } else {
		$string="X and Y must be an integer";
		$error = true;
    }
}

$output = array(
	"error" => $error,
	"string" => $string,
	"answer" => $answer
);

echo json_encode($output);
exit();
