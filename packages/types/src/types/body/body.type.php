<?php

namespace Lotsof\Types;

class Body extends Base
{
    public static function mock(string $suptitle = null, string $title = null, string $subtitle = null, string $lead = null, string $text = null, array $buttons = null, int $titleLevel = 1, int $suptitleLevel = 5, int $subtitleLevel = 4): Body
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
            titleLevel: $titleLevel,
            suptitleLevel: $suptitleLevel,
            subtitleLevel: $subtitleLevel
        );
        return $body;
    }

    protected ?string $suptitle;
    protected ?string $title;
    protected ?string $subtitle;
    protected ?string $lead;
    protected ?string $text;
    protected ?array $buttons;
    protected int $titleLevel = 3;
    protected int $subtitleLevel = 4;
    protected int $suptitleLevel = 5;

    public function __construct(string $suptitle = null, string $title = null, string $subtitle = null, string $lead = null, string $text = null, array $buttons = null, int $titleLevel = 1, int $suptitleLevel = 5, int $subtitleLevel = 4)
    {
        $this->suptitle = $suptitle;
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->lead = $lead;
        $this->text = $text;
        $this->buttons = $buttons;
        $this->titleLevel = $titleLevel;
        $this->subtitleLevel = $subtitleLevel;
        $this->suptitleLevel = $suptitleLevel;
    }

    public function hasButtons(): bool
    {
        return !empty($this->buttons);
    }

    public function toDomElement(): \DOMElement
    {

        $dom = new \DOMDocument('1.0', 'utf-8');

        $body = $dom->createElement('div');
        $body->setAttribute('class', 'body typo-rhythm typo-format');

        if ($this->suptitle !== null) {
            $suptitle = $dom->createElement('h5', $this->suptitle);
            $suptitle->setAttribute('class', '_suptitle typo-h' . $this->suptitleLevel);
            $body->appendChild($suptitle);
        }

        if ($this->title !== null) {
            $title = $dom->createElement('h' . $this->titleLevel, $this->title);
            $title->setAttribute('class', '_title typo-h' . $this->titleLevel);
            $body->appendChild($title);
        }

        if ($this->subtitle !== null) {
            $subtitle = $dom->createElement('h' . $this->subtitleLevel, $this->subtitle);
            $subtitle->setAttribute('class', '_subtitle typo-h' . $this->subtitleLevel);
            $body->appendChild($subtitle);
        }

        if ($this->lead !== null) {
            $lead = $dom->createElement('p', $this->lead);
            $lead->setAttribute('class', '_lead typo-lead');
            $body->appendChild($lead);
        }

        if ($this->text !== null) {
            $text = $dom->createElement('p', $this->text);
            $text->setAttribute('class', '_text typo-p');
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

        return $body;

    }

}