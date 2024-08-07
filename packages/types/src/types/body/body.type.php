<?php

namespace Lotsof\Types;

class Body extends Base
{
    public static function mock(string $suptitle = '', string $title = '', string $subtitle = '', string $lead = '', string $text = '', array $buttons = null, int $titleLevel = 3, int $suptitleLevel = 5, int $subtitleLevel = 4, array $attrs = [], string $id = null): Body
    {
        $faker = \Faker\Factory::create();

        if ($suptitle === '') {
            $suptitle = rand(0, 1) > 0.5 ? $faker->words(random_int(1, 3), true) : '';
        }
        if ($title === '') {
            $title = $faker->words(random_int(1, 5), true);
        }
        if ($subtitle === '') {
            $subtitle = rand(0, 1) > 0.5 ? $faker->words(random_int(1, 3), true) : '';
        }
        if ($lead === '') {
            $lead = rand(0, 1) > 0.5 ? $faker->words(random_int(5, 20), true) : '';
        }
        if ($text === '') {
            $text = $faker->words(random_int(5, 20), true);
        }
        if ($buttons === null) {
            $buttons = $faker->boolean() ? \Sugar\ar\pickSome([Button::mock(), Button::mock(), Button::mock()]) : null;
        }

        $body = new static(
            suptitle: $suptitle,
            title: $title,
            subtitle: $subtitle,
            lead: $lead,
            text: $text,
            buttons: $buttons,
            suptitleLevel: $suptitleLevel,
            titleLevel: $titleLevel,
            subtitleLevel: $subtitleLevel,
            id: $id,
            attrs: $attrs
        );
        return $body;
    }

    protected ?string $suptitle = '';
    protected ?string $title = '';
    protected ?string $subtitle = '';
    protected ?string $lead = '';
    protected ?string $text = '';
    protected ?array $buttons = [];
    protected ?bool $typoClasses = true;
    protected int $suptitleLevel = 5;
    protected int $titleLevel = 3;
    protected int $subtitleLevel = 4;
    protected array $attrs = [];

    public array $typesMap = [
        'buttons' => Button::class
    ];

    public function __construct(string $suptitle = '', string $title = '', string $subtitle = '', string $lead = '', string $text = '', array $buttons = null, bool $typoClasses = true, int $titleLevel = 1, int $suptitleLevel = 5, int $subtitleLevel = 4, array $attrs = [], string $id = null)
    {
        parent::__construct($id);
        $this->suptitle = $suptitle;
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->lead = $lead;
        $this->text = $text;
        $this->buttons = $buttons === null ? [] : $buttons;
        $this->typoClasses = $typoClasses;
        $this->suptitleLevel = $suptitleLevel;
        $this->titleLevel = $titleLevel;
        $this->subtitleLevel = $subtitleLevel;
        $this->attrs = $attrs;
    }
}