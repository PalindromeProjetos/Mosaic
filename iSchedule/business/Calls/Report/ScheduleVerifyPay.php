<?php

require_once '../../../vendor/autoload.php';

$object = new \iSchedule\Quick\schedule\ScheduleVerifyPay('P','mm','A4');

$object->callAction();