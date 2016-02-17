<?php

require_once '../../vendor/autoload.php';

$object = new \iContract\Coach\person();

echo $object->callAction();