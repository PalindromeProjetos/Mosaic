<?php

require_once '../../vendor/autoload.php';

$object = new \iContract\Coach\users();

echo $object->callAction();