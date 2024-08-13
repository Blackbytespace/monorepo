<?php

namespace Lotsof\Types;

class ImageType extends BaseType
{

    public static function mock(string $src = '', string $title = '', string $alt = '', bool $lazy = null, array $attrs = [], ?string $id = null): ImageType
    {
        $faker = \Faker\Factory::create();
        $image = new static(
            id: $id,
            src: $src !== '' ? $src : 'https://picsum.photos/1600/900',
            title: $title !== '' ? $title : $faker->sentence(),
            alt: $alt !== '' ? $alt : $faker->sentence(),
            lazy: $lazy !== null ? $lazy : $faker->boolean(),
            attrs: $attrs
        );
        return $image;
    }

    protected string $src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=';
    protected ?string $title = '';
    protected ?string $alt = '';
    // protected array $sizes = [];
    protected bool $lazy = true;
    protected array $attrs = [
        'class' => '_image image',
        'style' => 'object-fit: cover; background: white;',
    ];

    public function __construct(string $src = '', string $title = '', string $alt = '', bool $lazy = true, array $attrs = [], ?string $id = null)
    {
        parent::__construct($id);
        $this->src = $src;
        $this->title = $title;
        $this->alt = $alt;
        $this->lazy = $lazy;
        if (count($attrs)) {
            $this->attrs = $attrs;
        }
    }
}
