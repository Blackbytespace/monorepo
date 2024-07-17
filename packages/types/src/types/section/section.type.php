<?php

namespace Lotsof\Types;

class Section extends Base
{
    public static function mock(string $body = null, bool $fullWidth = null, ?Image $image = null, ?Video $video = null): Section
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

    public function __construct(string $body, bool $fullWidth = false, ?Image $image = null, ?Video $video = null)
    {
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

    public function toDomElement(): \DOMElement
    {

        $dom = new \DOMDocument('1.0', 'utf-8');
        $section = $dom->createElement('section');
        $classes = ['section'];
        if ($this->fullWidth) {
            $classes[] = '-fullwidth';
        }
        $section->setAttribute('class', implode(' ', $classes));

        // create the body container
        $body = $dom->createElement('div');
        $body->setAttribute('class', 'section_body');

        // create the background container
        $background = $dom->createElement('div');
        $background->setAttribute('class', 'section_background');
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
        if (method_exists($this->body, 'toHtml')) {
            $innerHtml = $this->body->toHtml();
        }
        $body->nodeValue = $innerHtml;

        return $section;

    }
}