<?php

namespace Lotsof\Types;

class BaseType implements \ArrayAccess
{

    protected string $id = '';
    private $_container = [];

    public function __construct(?string $id = null)
    {
        if ($id === null) {
            $classInfo = new \ReflectionClass($this);
            $classFullName = $classInfo->getName();
            $classNameParts = explode('\\', $classFullName);
            $className = end($classNameParts);
            $this->id = strtolower($className) . '-' . uniqid();
        } else {
            $this->id = $id;
        }
    }

    public function validate(): array
    {
        $validator = new \JsonSchema\Validator;

        $data = $this->toObject();

        $validator->validate($data, $this->jsonSchema());
        if ($validator->isValid()) {
            return [];
        } else {
            return $validator->getErrors();
        }
    }

    public function hydrate(array $data): void
    {
        foreach ($data as $prop => $arg) {
            if (!property_exists($this, $prop) || str_starts_with($prop, '_') || $prop === 'typesMap') {
                continue;
            }

            // get the classname of the current prop
            $className = '';
            if (property_exists($this, 'typesMap') && isset($this->typesMap[$prop])) {
                $className = $this->typesMap[$prop];
            } else {
                try {
                    $rp = new \ReflectionProperty(get_class($this), $prop);
                    $className = '';
                    $type = $rp->getType();
                    if ($type) {
                        $className = $rp->getType()->getName();
                    }
                } catch (e) {
                }
            }

            // if it exists, instanciate it with the data
            if (class_exists($className) && $arg !== null) {
                // if it's an array, hydrate each element
                if (!\Sugar\Is\assocArray($arg)) {
                    $this->$prop = array_map(function ($a) use ($className) {
                        $obj = new $className();
                        if (is_array($a)) {
                            $obj->hydrate($a);
                        }
                        return $obj;
                    }, $arg);
                    continue;
                }

                // create the new object
                $this->$prop = new $className();

                // otherwise hydrate the object
                // if it has the hydrate method
                if (method_exists($this->$prop, 'hydrate')) {
                    $this->$prop->hydrate($arg);
                }
            } else {
                $this->$prop = $arg;
            }
        }
    }

    public function __get($prop): mixed
    {
        if (property_exists($this, $prop)) {
            return $this->$prop;
        }
        return null;
    }

    public function has(string $prop): bool
    {
        if (!property_exists($this, $prop)) {
            return false;
        }
        if (is_string($this->$prop) && $this->$prop === '') {
            return false;
        }
        if (is_array($this->$prop) && count($this->$prop) === 0) {
            return false;
        }
        return true;
    }

    public function set(string $key, mixed $value): void
    {
        $this->$key = $value;
    }

    public function toObject(): object
    {
        $vars = get_object_vars($this);
        foreach ($vars as $key => $value) {
            // private _ properties
            if (str_starts_with($key, '_')) {
                unset($vars[$key]);
                continue;
            }
            // rercurse
            if (is_object($value) && method_exists($value, 'toObject')) {
                $vars[$key] = $value->toObject();
            } elseif (is_array($value)) {
                $vars[$key] = array_map(function ($v) {
                    if (is_object($v) && method_exists($v, 'toObject')) {
                        return $v->toObject();
                    }
                    return $v;
                }, $value);
            }
        }

        $vars['_metas'] = (object) [
            'class' => get_class($this),
            'vars' => array_keys($vars)
        ];

        return (object) $vars;
    }

    public function offsetSet($offset, $value): void
    {
        if (is_null($offset)) {
            $this->_container[] = $value;
        } else {
            $this->_container[$offset] = $value;
        }
    }

    public function offsetExists($offset): bool
    {
        return isset($this->_container[$offset]);
    }

    public function offsetUnset($offset): void
    {
        unset($this->_container[$offset]);
    }

    public function offsetGet($offset): mixed
    {
        return isset($this->_container[$offset]) ? $this->_container[$offset] : null;
    }

}