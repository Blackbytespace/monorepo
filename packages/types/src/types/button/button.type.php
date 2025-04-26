<?php

namespace Lotsof\Types;

class ButtonType extends BaseType
{
    public static array $styles = ['solid', 'outline', 'text'];

    public static function mock(
        ?string $style = null,
        ?\Lotsof\Types\LinkType $link = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = null
    ): ButtonType {
        $faker = \Faker\Factory::create();

        if ($style === null) {
            $style = $faker->randomElement(static::$styles);
        }
        if ($link === null) {
            $link = LinkType::mock();
        }
        if ($id === null) {
            $id = $faker->uuid();
        }
        if ($class === null) {
            $class = $faker->word();
        }

        $button = new static(
            style: $style,
            link: $link,
            id: $id,
            class: $class,
            attrs: $attrs
        );
        return $button;
    }

    protected string $style;
    protected ?\Lotsof\Types\LinkType $link;
    protected ?string $id;
    protected ?string $class;
    protected ?array $attrs = [];

    public array $typesMap = [
        'link' => \Lotsof\Types\LinkType::class
    ];

    public function __construct(
        ?string $style = 'solid',
        ?\Lotsof\Types\LinkType $link = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = []
    ) {
        parent::__construct();
        $this->style = $style;
        $this->link = $link;
        $this->id = $id;
        $this->class = $class;
        $this->attrs = $attrs;
    }
}