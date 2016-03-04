<?php

require_once '../../../vendor/autoload.php';

$object = new \iSchedule\Quick\schedule\ScheduleScore('L','mm',array(330,216)); //Officio2

//$object = new \AppAnest\Quick\schedule\ScheduleScore('L','mm','A4');


$object->callAction();