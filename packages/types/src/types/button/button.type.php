<?php

namespace Lotsof\Types;

class ButtonType extends BaseType
{

    public static array $styles = ['solid', 'outline', 'text'];

    public static function mock(): ButtonType
    {
        // $faker = \Faker\Factory::create();
        $button = new static(
            style: \Sugar\Array\pickRandom(['solid', 'outline', 'text']),
            link: \Lotsof\Types\LinkType::mock()
        );
        return $button;
    }

    protected string $style;
    protected string $class;
    protected ?\Lotsof\Types\LinkType $link;

    public function __construct(string $style = 'solid', string $class = '_btn btn', \Lotsof\Types\LinkType $link = null, ?string $id = null)
    {
        parent::__construct($id);
        $this->style = $style;
        $this->link = $link;
        if ($this->link === null) {
            $this->link = new \Lotsof\Types\LinkType();
        }
        $this->class = $class;
    }
}