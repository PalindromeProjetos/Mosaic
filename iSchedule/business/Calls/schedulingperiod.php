<?php

require_once '../../vendor/autoload.php';

$object = new \iSchedule\Coach\schedulingperiod();

echo $object->callAction();