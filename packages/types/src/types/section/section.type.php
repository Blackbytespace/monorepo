<?php

namespace Lotsof\Types;

class Section extends Base
{
    public static function mock(string $body = null, bool $fullWidth = null, ?Image $image = null, ?Video $video = null, ?string $id = null): Section
    {
        $faker = \Faker\Factory::create();

        if ($body === null) {
            $body = $faker->words(random_int(5, 20), true);
        }
        if ($fullWidth === null) {
            $fullWidth = $faker->boolean();
        }

        $isVideo = $faker->boolean();
        if ($image === null && !$isVideo) {
            $image = Image::mock();
        }
        if ($video === null && $isVideo) {
            $video = Video::mock();
        }

        $section = new static(
            id: $id,
            body: $body,
            fullWidth: $fullWidth,
            image: $image,
            video: $video
        );
        return $section;
    }

    protected string $body;
    protected bool $fullWidth = false;
    protected ?Image $image = null;
    protected ?Video $video = null;

    public function __construct(string $body, bool $fullWidth = false, ?Image $image = null, ?Video $video = null, ?string $id = null)
    {
        parent::__construct($id);
        $this->body = $body;
        $this->fullWidth = $fullWidth;
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