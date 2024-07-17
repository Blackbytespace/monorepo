<?php

namespace Lotsof\Types;

class Image extends Base
{

    public static function mock(string $src = null, string $title = null, string $alt = null, bool $lazy = null, array $attrs = []): Image
    {
        $faker = \Faker\Factory::create();
        $image = new static(
            src: $src !== null ? $src : 'https://picsum.photos/1600/900',
            title: $title !== null ? $title : $faker->sentence(),
            alt: $alt !== null ? $alt : $faker->sentence(),
            lazy: $lazy !== null ? $lazy : $faker->boolean(),
            attrs: $attrs
        );
        return $image;
    }

    protected string $src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=';
    protected ?string $title = null;
    protected ?string $alt = null;
    // protected array $sizes = [];
    protected bool $lazy = true;
    protected array $attrs = [
        'class' => '_image image',
        'style' => 'object-fit: cover; background: white;',
    ];

    public function __construct(string $src = null, string $title = null, string $alt = null, bool $lazy = true, array $attrs = [])
    {
        parent::__construct();
        $this->src = $src;
        $this->title = $title;
        $this->alt = $alt;
        $this->lazy = $lazy;
        if (count($attrs)) {
            $this->attrs = $attrs;
        }
    }

    public function toDomElement(): \DOMElement
    {
        $this->validate();

        $dom = new \DOMDocument('1.0', 'utf-8');
        $img = $dom->createElement('img');

        if ($this->src !== null) {
            $img->setAttribute('src', $this->src);
        }
        if ($this->lazy) {
            $img->setAttribute('loading', 'lazy');
        }
        if ($this->title !== null) {
            $img->setAttribute('title', $this->title);
        }
        if ($this->alt !== null) {
            $img->setAttribute('alt', $this->alt);
        }
        if ($this->attrs !== null) {
            foreach ($this->attrs as $key => $value) {
                $img->setAttribute($key, $value);
            }
        }

        return $img;
    }
}
