<?php

namespace Lotsof\Types;

class CardType extends \Lotsof\Types\BaseType
{
    public static function mock(
        ?\Lotsof\Types\BodyType $body = null,
        ?\Lotsof\Types\ImageType $image = null,
        // ?\Lotsof\Types\VideoType $video = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = null
    ): CardType {
        $faker = \Faker\Factory::create();
        $isVideo = random_int(0, 1);

        if ($image === null) {
            $image = ImageType::mock();
            if ($isVideo) {
                $image = null;
            }
        }
        // if ($video === null) {
        //     $video = VideoType::mock();
        //     if (!$isVideo) {
        //         $video = null;
        //     }
        // }

        if ($body === null) {
            $body = BodyType::mock(
                headingLevelTag: 3,
                headingLevelDisplay: 3
            );
        }

        if ($id === null) {
            $id = 'card-' . rand(0, 9999);
        }

        $card = new static(
            body: $body,
            image: $image,
            // video: $video,
            id: $id,
            class: $class,
            attrs: $attrs
        );
        return $card;
    }

    protected ?\Lotsof\Types\BodyType $body;
    protected ?\Lotsof\Types\ImageType $image;
    // protected ?\Lotsof\Types\VideoType $video;
    protected ?string $id = null;
    protected ?string $class = null;
    protected ?array $attrs = [];

    public function __construct(
        ?\Lotsof\Types\BodyType $body = null,
        ?\Lotsof\Types\ImageType $image = null,
        // ?\Lotsof\Types\VideoType $video = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = []
    ) {
        parent::__construct();
        $this->body = $body;
        $this->image = $image;
        // $this->video = $video;
        $this->id = $id;
        $this->class = $class;
        $this->attrs = $attrs;
    }
}