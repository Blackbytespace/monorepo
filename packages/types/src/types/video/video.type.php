<?php

namespace Lotsof\Types;

class Video extends Base
{

    public static function mock(string $src = null, string $poster = null, string $title = null, bool $autoplay = null, bool $controls = null, bool $loop = false, bool $muted = null, bool $playsinline = null, array $attrs = []): Video
    {
        $faker = \Faker\Factory::create();
        $video = new static(
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

    public function __construct(string $src = null, string $poster = null, string $title = null, bool $autoplay = false, bool $controls = false, bool $loop = false, bool $muted = null, bool $playsinline = true, array $attrs = [])
    {
        parent::__construct();
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

    public function toDomElement(): \DOMElement
    {
        $this->validate();

        $dom = new \DOMDocument('1.0', 'utf-8');
        $video = $dom->createElement('video');

        if ($this->src !== null) {
            $video->setAttribute('src', $this->src);
        }
        if ($this->poster !== null) {
            $video->setAttribute('poster', $this->poster);
        }
        if ($this->title !== null) {
            $video->setAttribute('title', $this->title);
        }
        if ($this->autoplay) {
            $video->setAttribute('autoplay', '1');
        }
        if ($this->controls) {
            $video->setAttribute('controls', '1');
        }
        if ($this->loop) {
            $video->setAttribute('loop', '1');
        }
        if ($this->muted) {
            $video->setAttribute('muted', '1');
        }
        if ($this->playsinline) {
            $video->setAttribute('playsinline', '1');
        }
        if ($this->attrs !== null) {
            foreach ($this->attrs as $key => $value) {
                $video->setAttribute($key, $value);
            }
        }

        return $video;
    }
}
