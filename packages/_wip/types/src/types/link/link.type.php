<?php

namespace Blackbyte\Types;

class LinkType extends BaseType
{
    public static function mock(
        ?string $href = null,
        ?string $text = null,
        ?string $title = null,
        ?string $target = null,
        ?string $rel = null,
        ?string $ariaLabel = null,
        ?string $id = null,
        ?string $class = null,
    ): LinkType {
        $faker = \Faker\Factory::create();

        if ($href === null) {
            $href = $faker->url();
        }
        if ($text === null) {
            $text = $faker->words(random_int(1, 3), true);
        }
        if ($title === null) {
            $title = $faker->words(random_int(1, 3), true);
        }
        if ($target === null) {
            $target = $faker->randomElement(['_self', '_blank', '_parent', '_top']);
        }
        if ($rel === null) {
            $rel = $faker->randomElement(['noopener', 'noreferrer', 'noopener noreferrer']);
        }
        if ($ariaLabel === null) {
            $ariaLabel = $faker->words(random_int(1, 3), true);
        }

        $link = new static(
            href: $href,
            text: $text,
            title: $title,
            target: $target,
            rel: $rel,
            ariaLabel: $ariaLabel,
            id: $id,
            class: $class
        );
        return $link;
    }

    protected ?string $href;
    protected ?string $text;
    protected ?string $title;
    protected ?string $target;
    protected ?string $rel;
    protected ?string $ariaLabel;
    protected ?string $id;
    protected ?string $class;

    public function __construct(
        ?string $href = null,
        ?string $text = null,
        ?string $title = null,
        ?string $target = null,
        ?string $rel = 'noopener noreferrer',
        ?string $ariaLabel = null,
        ?string $id = null,
        ?string $class = null,
    ) {
        parent::__construct();
        $this->href = $href;
        $this->text = $text;
        $this->title = $title;
        $this->target = $target;
        $this->rel = $rel;
        $this->ariaLabel = $ariaLabel;
        $this->id = $id;
        $this->class = $class;

        if ($this->title === null && $this->text !== null) {
            $this->title = $this->text;
        }
        if ($this->ariaLabel === null && $this->title !== null) {
            $this->ariaLabel = $this->title;
        }
    }
}