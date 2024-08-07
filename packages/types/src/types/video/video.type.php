<?php

namespace Lotsof\Types;

class Video extends Base
{

    public static function mock(string $src = '', string $poster = '', string $title = '', bool $autoplay = null, bool $controls = null, bool $loop = false, bool $muted = null, bool $playsinline = null, array $attrs = [], ?string $id = null): Video
    {
        $faker = \Faker\Factory::create();
        $video = new static(
            id: $id,
            src: 'https://media.istockphoto.com/id/1550973385/de/video/epische-filmszenen-schaffen-einen-ruhigen-und-beruhigenden-digitalen-3d-raum.mp4?s=mp4-640x640-is&k=20&c=XhLsTHmHBF8VH9CyNHliPb1xn2MpE-BvmeNR7ev7SuM=',
            title: $faker->sentence(),
            poster: 'https://picsum.photos/1600/900',
            autoplay: $autoplay !== null ? $autoplay : $faker->boolean(),
            controls: $controls !== null ? $controls : $faker->boolean(),
            loop: $loop !== null ? $loop : $faker->boolean(),
            muted: $muted !== null ? $muted : $faker->boolean(),
            playsinline: $playsinline !== null ? $playsinline : $faker->boolean(),
            attrs: $attrs
        );
        return $video;
    }

    protected string $src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=';
    protected ?string $poster = null;
    protected ?string $title = null;
    protected bool $autoplay = false;
    protected bool $controls = false;
    protected bool $loop = false;
    protected ?bool $muted = null;
    protected bool $playsinline = true;
    // protected array $sizes = [];
    protected array $attrs = [
        'class' => '_video video',
        'style' => 'object-fit: cover; background: white;',
    ];

    public function __construct(string $src = '', string $poster = '', string $title = '', bool $autoplay = false, bool $controls = false, bool $loop = false, bool $muted = null, bool $playsinline = true, array $attrs = [], ?string $id = null)
    {
        parent::__construct($id);
        $this->src = $src;
        $this->poster = $poster;
        $this->title = $title;
        $this->autoplay = $autoplay;
        $this->controls = $controls;
        $this->loop = $loop;
        $this->playsinline = $playsinline;
        if ($autoplay === true && $muted === null) {
            $this->muted = true;
        } else {
            $this->muted = $muted;
        }
        if (count($attrs)) {
            $this->attrs = $attrs;
        }
    }
}
