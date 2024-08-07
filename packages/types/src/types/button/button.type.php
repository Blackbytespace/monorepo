<?php

namespace Lotsof\Types;

class Button extends Base
{

    public static array $styles = ['solid', 'outline', 'text'];

    public static function mock(): Button
    {
        // $faker = \Faker\Factory::create();
        $button = new static(
            style: \Sugar\ar\pickRandom(['solid', 'outline', 'text']),
            link: \Lotsof\Types\Link::mock()
        );
        return $button;
    }

    protected string $style;
    protected string $class;
    protected ?\Lotsof\Types\Link $link;

    public function __construct(string $style = 'solid', string $class = '_btn btn', \Lotsof\Types\Link $link = null, ?string $id = null)
    {
        parent::__construct($id);
        $this->style = $style;
        $this->link = $link;
        if ($this->link === null) {
            $this->link = new \Lotsof\Types\Link();
        }
        $this->class = $class;
    }
}