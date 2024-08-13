<?php

namespace Lotsof\Types;

class HeroType extends BaseType
{
    public static function mock(?BodyType $body = null, ?ImageType $image = null, ?VideoType $video = null, ?string $size = null, ?string $align = null, ?string $theme = null, ?string $id = null): HeroType
    {
        $faker = \Faker\Factory::create();

        if ($body === null) {
            $body = BodyType::mock();
        }
        $isVideo = $faker->boolean();
        if ($image === null && !$isVideo) {
            $image = ImageType::mock();
        } else {
            $image = new ImageType();
        }
        if ($video === null && $isVideo) {
            $video = VideoType::mock();
        } else {
            $video = new VideoType();
        }
        if ($size === null) {
            $size = \Sugar\Array\pickRandom(['small', 'medium', 'large']);
        }
        if ($align === null) {
            $align = \Sugar\Array\pickRandom(['left', 'center', 'right']);
        }
        if ($theme === null) {
            $theme = \Sugar\Array\pickRandom(['light', 'dark']);
        }

        $hero = new static(
            id: $id,
            theme: $theme,
            size: $size,
            align: $align,
            body: $body,
            image: $image,
            video: $video
        );
        return $hero;
    }

    protected string $theme;
    protected string $size;
    protected string $align;
    protected ?BodyType $body = null;
    protected ?ImageType $image = null;
    protected ?VideoType $video = null;

    // public array $typesMap = [
    //     'image' => Image::class,
    //     'video' => Video::class,
    // ];

    public function __construct(?BodyType $body = null, ?ImageType $image = null, ?VideoType $video = null, string $size = 'medium', string $align = 'left', string $theme = 'light', ?string $id = null)
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