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