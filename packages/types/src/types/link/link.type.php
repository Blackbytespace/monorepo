<?php

namespace Lotsof\Types;

class Link extends Base
{
    public static function mock(string $href = null, string $text = null, string $title = null, string $target = null, string $class = '_link', bool $noopener = null, bool $noreferrer = null, string $ariaLabel = null): Link
    {
        $faker = \Faker\Factory::create();

        if ($href === null) {
            $href = $faker->url;
        }
        if ($text === null) {
            $text = $faker->words(random_int(1, 3), true);
        }
        if ($title === null && $faker->boolean()) {
            $title = $faker->sentence();
        }
        if ($target === null) {
            $target = \Sugar\ar\pickRandom(['_self', '_blank']);
        }
        if ($noopener === null && $faker->boolean()) {
            $noopener = $faker->boolean();
        }
        if ($noreferrer === null && $faker->boolean()) {
            $noreferrer = $faker->boolean();
        }
        if ($ariaLabel === null && $faker->boolean()) {
            $ariaLabel = $faker->sentence();
        }

        $link = new static(
            href: $href,
            text: $text,
            title: $title,
            target: $target,
            class: $class,
            noopener: $noopener,
            noreferrer: $noreferrer,
            ariaLabel: $ariaLabel
        );
        return $link;
    }

    protected ?string $href;
    protected ?string $text;
    protected ?string $title;
    protected ?string $target;
    protected ?string $class;
    protected ?bool $noopener = null;
    protected ?bool $noreferrer = null;
    protected ?string $ariaLabel = null;

    public function __construct(string $href = null, string $text = null, string $title = null, string $target = null, string $class = '_link', bool $noopener = null, bool $noreferrer = null, string $ariaLabel = null)
    {
        $this->href = $href;
        $this->text = $text;
        $this->title = $title;
        $this->target = $target;
        $this->class = $class;

        if ($this->title === null && $this->text !== null) {
            $this->title = $this->text;
        }
        if ($this->noopener === null && $this->target === '_blank') {
            $this->noopener = true;
        }
        if ($this->noreferrer === null && $this->target === '_blank') {
            $this->noreferrer = true;
        }
        if ($this->ariaLabel === null && $this->title !== null) {
            $this->ariaLabel = $this->title;
        }
    }

    public function toDomElement(): \DOMElement
    {
        $this->validate();

        $dom = new \DOMDocument('1.0', 'utf-8');
        $a = $dom->createElement('a');

        if ($this->class !== null) {
            $a->setAttribute('class', $this->class);
        }
        if ($this->href !== null) {
            $a->setAttribute('href', $this->href);
        }
        if ($this->title !== null) {
            $a->setAttribute('title', $this->title);
        }
        if ($this->target !== null) {
            $a->setAttribute('target', $this->target);
        }
        // aria-label
        if ($this->ariaLabel !== null) {
            $a->setAttribute('aria-label', $this->ariaLabel);
        }
        if ($this->text !== null) {
            $a->nodeValue = $this->text;
        }
        if ($this->rel() !== '') {
            $a->setAttribute('rel', $this->rel());
        }

        return $a;
    }

    public function rel(): string
    {
        return trim($this->noopener() . ' ' . $this->noreferrer());
    }

    public function noreferrer(): string
    {
        return $this->noreferrer ? 'noreferrer' : '';
    }

    public function noopener(): string
    {
        return $this->noopener ? 'noopener' : '';
    }

    public function validate(): void
    {
        parent::validate();
    }

}