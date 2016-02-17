<?php

require_once '../../vendor/autoload.php';

$object = new \iSchedule\Coach\engaged();

echo $object->callAction();