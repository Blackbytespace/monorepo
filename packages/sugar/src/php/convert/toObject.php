<?php

namespace Sugar\Convert;

/**
 * @name            toObject
 * @namespace       php.convert
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to convert recursively an associative array to an object
 *
 * @param       {Array}         $array         The base array to convert to an object
 * @return      {Object}                         The resulting object
 *
 * @snippet         \Sugar\Convert\toObject($1);
 *
 * @example         php
 * \Sugar\Convert\toObject([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://blackbyte.space)
 */
function toObject($array)
{
    if (!is_array($array)) {
        $array = (array) $array;
    }

    $obj = new \stdClass();

    if (is_object($array)) {
        $array = (array) $array;
    }

    foreach ($array as $k => $v) {
        if (strlen($k)) {
            if (is_array($v)) {
                $obj->{$k} = toObject($v); //RECURSION
            } else {
                $obj->{$k} = $v;
            }
        }
    }

    return $obj;
}
