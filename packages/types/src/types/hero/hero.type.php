<?php

namespace Lotsof\Types;

class Hero extends Base
{
    public static function mock(?Body $body = null, ?Image $image = null, ?Video $video = null, ?string $size = null, ?string $align = null, ?string $theme = null, ?string $id = null): Hero
    {
        $faker = \Faker\Factory::create();

        if ($body === null) {
            $body = Body::mock();
        }
        $isVideo = $faker->boolean();
        if ($image === null && !$isVideo) {
            $image = Image::mock();
        } else {
            $image = new Image();
        }
        if ($video === null && $isVideo) {
            $video = Video::mock();
        } else {
            $video = new Video();
        }
        if ($size === null) {
            $size = \Sugar\ar\pickRandom(['small', 'medium', 'large']);
        }
        if ($align === null) {
            $align = \Sugar\ar\pickRandom(['left', 'center', 'right']);
        }
        if ($theme === null) {
            $theme = \Sugar\ar\pickRandom(['light', 'dark']);
        }

        $section = new static(
            id: $id,
            theme: $theme,
            size: $size,
            align: $align,
            body: $body,
            image: $image,
            video: $video
        );
        return $section;
    }

    protected string $theme;
    protected string $size;
    protected string $align;
    protected ?Body $body = null;
    protected ?Image $image = null;
    protected ?Video $video = null;

    // public array $typesMap = [
    //     'image' => Image::class,
    //     'video' => Video::class,
    // ];

    public function __construct(?Body $body = null, ?Image $image = null, ?Video $video = null, string $size = 'medium', string $align = 'left', string $theme = 'light', ?string $id = null)
    {
        parent::__construct($id);
        $this->theme = $theme;
        $this->size = $size;
        $this->align = $align;
        $this->body = $body;
        $this->image = $image;
        $this->video = $video;

        if ($this->video !== null) {
            $this->video->set('controls', false);
            $this->video->set('autoplay', true);
            $this->video->set('muted', true);
            $this->video->set('loop', true);
        }
    }
}