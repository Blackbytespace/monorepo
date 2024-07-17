<?php

namespace Lotsof\Types;

class HeaderBanner extends Base
{
    public static function mock(?Body $body = null, ?Image $image = null, ?Video $video = null): HeaderBanner
    {
        $faker = \Faker\Factory::create();

        if ($body === null) {
            $body = Body::mock();
        }
        $isVideo = $faker->boolean();
        if ($image === null && !$isVideo) {
            $image = Image::mock();
        }
        if ($video === null && $isVideo) {
            $video = Video::mock();
        }

        $section = new static(
            body: $body,
            image: $image,
            video: $video
        );
        return $section;
    }

    protected ?Body $body = null;
    protected ?Image $image = null;
    protected ?Video $video = null;

    public function __construct(?Body $body = null, ?Image $image = null, ?Video $video = null)
    {
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

    public function toDomElement(): \DOMElement
    {
        $dom = new \DOMDocument('1.0', 'utf-8');
        $section = $dom->createElement('section');
        $classes = ['header-banner'];
        $section->setAttribute('class', implode(' ', $classes));

        // create the body container
        $body = $dom->createElement('div');
        $body->setAttribute('class', '_body');

        // create the background container
        $background = $dom->createElement('div');
        $background->setAttribute('class', '_background');
        if ($this->image !== null) {
            $background->appendChild($dom->importNode($this->image->toDomElement(), true));
        }
        if ($this->video !== null) {
            $background->appendChild($dom->importNode($this->video->toDomElement(), true));
        }

        // add the background and body inside the section
        $section->appendChild($background);
        $section->appendChild($body);

        // inject content into section
        $innerHtml = $this->body;
        if (method_exists($this->body, 'toDomElement')) {
            $body->appendChild($dom->importNode($this->body->toDomElement(), true));
        }

        return $section;

    }
}