<?php

namespace Lotsof\Types;

class Body extends Base
{
    public static function mock(string $suptitle = null, string $title = null, string $subtitle = null, string $lead = null, string $text = null, array $buttons = null, int $titleLevel = 3, int $suptitleLevel = 5, int $subtitleLevel = 4, array $attrs = [], string $id = null): Body
    {
        $faker = \Faker\Factory::create();

        if ($suptitle === null) {
            $suptitle = rand(0, 1) > 0.5 ? $faker->words(random_int(1, 3), true) : null;
        }
        if ($title === null) {
            $title = $faker->words(random_int(1, 5), true);
        }
        if ($subtitle === null) {
            $subtitle = rand(0, 1) > 0.5 ? $faker->words(random_int(1, 3), true) : null;
        }
        if ($lead === null) {
            $lead = rand(0, 1) > 0.5 ? $faker->words(random_int(5, 20), true) : null;
        }
        if ($text === null) {
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

    protected ?string $id;
    protected ?string $suptitle;
    protected ?string $title;
    protected ?string $subtitle;
    protected ?string $lead;
    protected ?string $text;
    protected ?array $buttons = [];
    protected ?bool $typoClasses = true;
    protected int $suptitleLevel = 5;
    protected int $titleLevel = 3;
    protected int $subtitleLevel = 4;
    protected array $attrs = [];

    public array $typesMap = [
        'buttons' => Button::class
    ];

    public function __construct(string $suptitle = null, string $title = null, string $subtitle = null, string $lead = null, string $text = null, array $buttons = null, bool $typoClasses = true, int $titleLevel = 1, int $suptitleLevel = 5, int $subtitleLevel = 4, array $attrs = [], string $id = null)
    {
        $this->id = $id;
        $this->suptitle = $suptitle;
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->lead = $lead;
        $this->text = $text;
        $this->buttons = $buttons;
        $this->typoClasses = $typoClasses;
        $this->suptitleLevel = $suptitleLevel;
        $this->titleLevel = $titleLevel;
        $this->subtitleLevel = $subtitleLevel;
        $this->attrs = $attrs;
    }

    public function hasButtons(): bool
    {
        return !empty($this->buttons);
    }

    public function toDomElement(): \DOMElement
    {
        $dom = new \DOMDocument('1.0', 'utf-8');

        $body = $dom->createElement('div');
        $cls = 'body';
        if ($this->typoClasses) {
            $cls .= ' typo-rhythm typo-format';
        }
        $body->setAttribute('class', $cls);

        if ($this->id !== null) {
            $body->setAttribute('id', $this->id);
        }

        if ($this->suptitle !== null) {
            $suptitle = $dom->createElement('h' . $this->suptitleLevel, $this->suptitle);
            $cls = '_suptitle';
            if ($this->typoClasses) {
                $cls .= ' typo-h' . $this->suptitleLevel;
            }
            $suptitle->setAttribute('class', $cls);
            $body->appendChild($suptitle);
        }

        if ($this->title !== null) {
            $title = $dom->createElement('h' . $this->titleLevel, $this->title);
            $cls = '_title';
            if ($this->typoClasses) {
                $cls .= ' typo-h' . $this->titleLevel;
            }
            $title->setAttribute('class', $cls);
            $body->appendChild($title);
        }

        if ($this->subtitle !== null) {
            $subtitle = $dom->createElement('h' . $this->subtitleLevel, $this->subtitle);
            $cls = '_subtitle';
            if ($this->typoClasses) {
                $cls .= ' typo-h' . $this->subtitleLevel;
            }
            $body->appendChild($subtitle);
        }

        if ($this->lead !== null) {
            $lead = $dom->createElement('p', $this->lead);
            $cls = '_lead';
            if ($this->typoClasses) {
                $cls .= ' typo-lead';
            }
            $lead->setAttribute('class', $cls);
            $body->appendChild($lead);
        }

        if ($this->text !== null) {
            $text = $dom->createElement('p', $this->text);
            $cls = '_text';
            if ($this->typoClasses) {
                $cls .= ' typo-p';
            }
            $text->setAttribute('class', $cls);
            $body->appendChild($text);
        }

        if ($this->hasButtons()) {
            $buttons = $dom->createElement('div');
            $buttons->setAttribute('class', '_buttons');
            foreach ($this->buttons as $button) {
                $buttons->appendChild($dom->importNode($button->toDomElement(), true));
            }
            $body->appendChild($buttons);
        }

        if (!empty($this->attrs)) {
            foreach ($this->attrs as $key => $value) {
                $body->setAttribute($key, $value);
            }
        }

        return $body;

    }

}