<?php

namespace Blackbyte\Types;

class ButtonType extends BaseType
{
    public static array $styles = ['solid', 'outline', 'text'];

    public static function mock(
        ?string $type = null,
        ?\Blackbyte\Types\LinkType $link = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = null
    ): ButtonType {
        $faker = \Faker\Factory::create();

        if ($type === null) {
            $type = $faker->randomElement(static::$styles);
        }
        if ($link === null) {
            $link = LinkType::mock();
        }

        $button = new static(
            type: $type,
            link: $link,
            id: $id,
            class: $class,
            attrs: $attrs
        );
        return $button;
    }

    protected string $type;
    protected ?\Blackbyte\Types\LinkType $link;
    protected ?string $id;
    protected ?string $class;
    protected ?array $attrs = [];

    public array $typesMap = [
        'link' => \Blackbyte\Types\LinkType::class
    ];

    public function __construct(
        ?string $type = 'solid',
        ?\Blackbyte\Types\LinkType $link = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = []
    ) {
        parent::__construct();
        $this->type = $type;
        $this->link = $link;
        $this->id = $id;
        $this->class = $class;
        $this->attrs = $attrs;
    }
}