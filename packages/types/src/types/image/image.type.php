<?php

namespace Lotsof\Types;

class ImageType extends BaseType
{
    static public array $priorities = ['low', 'auto', 'high'];

    public static function mock(
        ?string $src = null,
        ?string $title = null,
        ?string $alt = null,
        ?string $srcset = null,
        ?array $sizes = null,
        ?bool $lazy = true,
        ?int $width = null,
        ?int $height = null,
        ?string $priority = null,
        ?\Lotsof\Types\ImgixType $imgix = null,
        ?array $focalPoint = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = [],
    ): ImageType {
        $faker = \Faker\Factory::create();

        if ($src === null) {
            $src = 'https://picsum.photos/1600/900?random=' . rand(1, 1000);
        }
        if ($title === null) {
            $title = $faker->sentence();
        }
        if ($alt === null) {
            $alt = $faker->sentence();
        }
        if ($lazy === null) {
            $lazy = $faker->boolean();
        }
        if ($priority === null) {
            $priority = $faker->randomElement(static::$priorities);
        }

        $image = new static(
            src: $src,
            title: $title,
            alt: $alt,
            srcset: $srcset,
            sizes: $sizes,
            lazy: $lazy,
            width: $width,
            height: $height,
            priority: $priority,
            imgix: $imgix,
            focalPoint: $focalPoint,
            id: $id,
            class: $class,
            attrs: $attrs
        );

        return $image;
    }

    protected string $src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=';
    protected ?string $alt = null;
    protected ?string $title = null;
    protected ?string $srcset = null;
    protected ?array $sizes = null;
    protected ?bool $lazy = true;
    protected ?int $width = null;
    protected ?int $height = null;
    protected ?string $priority = 'auto';
    protected ?\Lotsof\Types\ImgixType $imgix = null;
    protected ?array $focalPoint = null;
    protected ?string $id = null;
    protected ?string $class = null;
    protected ?array $attrs = null;

    public function __construct(
        ?string $src = null,
        ?string $title = null,
        ?string $alt = null,
        ?string $srcset = null,
        ?array $sizes = null,
        ?bool $lazy = true,
        ?int $width = null,
        ?int $height = null,
        ?string $priority = 'auto',
        ?\Lotsof\Types\ImgixType $imgix = null,
        ?array $focalPoint = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = [],
    ) {
        parent::__construct();
        $this->src = $src;
        $this->title = $title;
        $this->alt = $alt;
        $this->srcset = $srcset;
        $this->sizes = $sizes;
        $this->lazy = $lazy;
        $this->width = $width;
        $this->height = $height;
        $this->priority = $priority;
        $this->imgix = $imgix;
        $this->focalPoint = $focalPoint;
        $this->id = $id;
        $this->class = $class;
        $this->attrs = $attrs;
    }
}
