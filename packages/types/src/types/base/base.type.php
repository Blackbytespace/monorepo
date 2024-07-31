<?php

namespace Lotsof\Types;

class Base implements \ArrayAccess
{

    private $_container = [];

    public function __construct()
    {
    }

    public function validate(): void
    {
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
                if (!\Sugar\is\assocArray($arg)) {
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

    public function __toString(): string
    {
        if (method_exists($this, 'toHtml')) {
            return $this->toHtml();
        }
        return '';
    }

    public function set(string $key, mixed $value): void
    {
        $this->$key = $value;
    }

    private function _resolveSchemaRefs(object $schema, string $schemaPath): object
    {
        // resolve $ref properties
        $schema = \Sugar\object\deepMap($schema, function ($prop, &$value, &$object) use ($schemaPath) {
            if ($prop === '$ref') {
                $relPath = realpath(dirname($schemaPath) . '/' . $value);
                if (!file_exists($relPath)) {
                    throw new \Exception('Schema "' . $relPath . '" file not found referenced in "' . $schemaPath . '"');
                }
                $schema = file_get_contents($relPath);
                $schema = json_decode($schema);
                foreach ($schema as $key => $val) {
                    $object->$key = $val;
                }
                return -1;
            }
            return $value;
        });

        // remove all $ref properties
        $schema = \Sugar\object\deepFilter($schema, function ($prop, $value) {
            if ($prop === '$ref') {
                return false;
            }
            return true;
        });

        return $schema;
    }

    public function toSchema(): object
    {
        $class_info = new \ReflectionClass($this);
        $folderPath = dirname($class_info->getFileName());
        $className = explode("\\", basename($class_info->getName()));
        $className = end($className);
        $schemaPath = $folderPath . '/' . \Sugar\string\camelCase($className) . '.schema.json';

        if (file_exists($schemaPath)) {
            $schema = file_get_contents($schemaPath);
            $schema = json_decode($schema);
            $schema = $this->_resolveSchemaRefs($schema, $schemaPath);
            return $schema;
        }

        return (object) [];
    }

    public function toObject(): object
    {
        $vars = get_object_vars($this);
        foreach ($vars as $key => $value) {
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

        // html
        if (debug_backtrace()[1]['function'] !== 'toHtml' && method_exists($this, 'toHtml')) {
            $vars['html'] = $this->toHtml();
        }

        return (object) $vars;
    }

    public function toHtml(): string
    {
        if (!method_exists($this, 'toDomElement')) {
            throw new \Exception('toDomElement method not found in class ' . get_class($this) . '. You will need to implement your own \"toHtml\" method...');
        }
        $dom = new \DOMDocument('1.0', 'utf-8');
        $dom->appendChild($dom->importNode($this->toDomElement(), true));
        return $dom->saveHTML();
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