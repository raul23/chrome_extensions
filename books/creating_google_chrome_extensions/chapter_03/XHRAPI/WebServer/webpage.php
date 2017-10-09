<?php
$raw_input = trim($_GET["name"]);
if(!preg_match("/^[a-zA-Z ]*$/",$raw_input)) {
	echo "";
} else {
	echo strtoupper($raw_input);
}
?>