<?php

require_once '../../../vendor/autoload.php';

$object = new \iSchedule\Quick\schedule\ScheduleExtract('P','mm','A4');  //Para //Officio: ('L','mm',array(330,216))

$object->callAction();