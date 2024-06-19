<?php

class Base
{
    public function __construct($args = null)
    {
        if ($args) {
            foreach ($args as $prop => $arg) {

                if (!property_exists($this, $prop)) {
                    continue;
                }

                // get the classname of the current prop
                $rp = new \ReflectionProperty(get_class($this), $prop);
                $className = '';
                $type = $rp->getType();
                if ($type) {
                    $className = $rp->getType()->getName();
                }

                // if it exists, instanciate it with the data
                if (class_exists($className)) {
                    $this->$prop = new $className($arg);    
                } else {
                    $this->$prop = $arg;
                }

            }
        }
    }
}