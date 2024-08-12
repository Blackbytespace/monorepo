<?php

namespace Factory\Config;

function get(string $path): mixed
{
    $factoryConfig = getenv('FACTORY_CONFIG');
    $factoryConfig = json_decode($factoryConfig, false, 512, JSON_THROW_ON_ERROR);
    $value = \Sugar\object\get($factoryConfig, $path);
    return $value;
}