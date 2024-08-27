<?php

namespace Components\Card;

class Card extends \Lotsof\Types\BaseType
{
    protected \Lotsof\Types\BodyType $body;
    protected \Lotsof\Types\ImageType $image;

    public function __construct(\Lotsof\Types\BodyType $body = null, \Lotsof\Types\ImageType $image = null)
    {
        $this->body = $body;
        $this->image = $image;
    }
}