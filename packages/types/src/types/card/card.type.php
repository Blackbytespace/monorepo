<?php

namespace Lotsof\Types;

class Card extends \Lotsof\Types\Base
{
    public static function mock(\Lotsof\Types\Body $body = null, \Lotsof\Types\Image $image = null, \Lotsof\Types\Video $video = null, ?string $areaFigure = null, ?string $areaBody = null, ?string $areaBeforeBody = null, ?string $areaAfterBody = null): Card
    {
        $faker = \Faker\Factory::create();

        $isVideo = random_int(0, 1);

        if ($image === null) {
            $image = Image::mock();
            if ($isVideo) {
                $image = null;
            }
        }
        if ($video === null) {
            $video = Video::mock();
            if (!$isVideo) {
                $video = null;
            }
        }

        if ($body === null) {
            $body = Body::mock(
                titleLevel: 3
            );
        }

        if ($areaFigure === null && $faker->boolean()) {
            $areaFigure = "<div class=\"typo-h3\">areaFigure</div>";
        }

        if ($areaBeforeBody === null && $faker->boolean()) {
            $areaBeforeBody = "<p class=\"typo-p\">areaBeforeBody</p>";
        }
        if ($areaAfterBody === null && $faker->boolean()) {
            $areaAfterBody = "<p class=\"typo-p\">areaAfterBody</p>";
        }

        $card = new static(
            body: $body,
            image: $image,
            video: $video,
            areaFigure: $areaFigure,
            areaBody: $areaBody,
            areaBeforeBody: $areaBeforeBody,
            areaAfterBody: $areaAfterBody
        );
        return $card;
    }

    protected \Lotsof\Types\Body $body;
    protected ?\Lotsof\Types\Image $image;
    protected ?\Lotsof\Types\Video $video;
    protected ?string $areaFigure = null;
    protected ?string $areaBody = null;
    protected ?string $areaBeforeBody = null;
    protected ?string $areaAfterBody = null;

    public function __construct(\Lotsof\Types\Body $body = null, \Lotsof\Types\Image $image = null, \Lotsof\Types\Video $video = null, ?string $areaFigure = null, ?string $areaBody = null, ?string $areaBeforeBody = null, ?string $areaAfterBody = null)
    {
        $this->body = $body;
        $this->image = $image;
        $this->video = $video;
        $this->areaFigure = $areaFigure;
        $this->areaBody = $areaBody;
        $this->areaBeforeBody = $areaBeforeBody;
        $this->areaAfterBody = $areaAfterBody;
    }
}