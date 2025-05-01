<?php

namespace Lotsof\Types;

class BodyType extends BaseType
{
    public static function mock(
        ?string $suptitle = '',
        ?string $title = '',
        ?int $headingLevelTag = null,
        ?int $headingLevelDisplay = null,
        ?string $subtitle = '',
        ?string $lead = '',
        ?string $text = '',
        ?array $buttons = null,
        ?bool $format = null,
        ?bool $rhythm = null,
        ?bool $typoClasses = null,
        ?string $id = null,
        ?string $class = null,
        ?array $attrs = []
    ): BodyType {
        $faker = \Faker\Factory::create();

        if ($suptitle === '' && $faker->boolean()) {
            $suptitle = $faker->words(random_int(1, 3), true);
        }
        if ($title === '') {
            $title = $faker->words(random_int(1, 5), true);
        }
        if ($headingLevelTag === null) {
            $headingLevelTag = rand(1, 6);
        }
        if ($headingLevelDisplay === null) {
            $headingLevelDisplay = rand(1, 6);
        }
        if ($subtitle === '' && $faker->boolean()) {
            $subtitle = $faker->words(random_int(1, 3), true);
        }
        if ($lead === '' && $faker->boolean()) {
            $lead = $faker->words(random_int(5, 20), true);
        }
        if ($text === '' && $faker->boolean()) {
            $text = $faker->words(random_int(5, 20), true);
        }
        if ($buttons === null && $faker->boolean()) {
            $buttons = \Sugar\Array\pickSome([ButtonType::mock(), ButtonType::mock(), ButtonType::mock()]);
        }
        if ($format === null) {
            $format = $faker->boolean();
            $format = true;
        }
        if ($rhythm === null) {
            $rhythm = $faker->boolean();
            $rhythm = true;
        }
        if ($typoClasses === null) {
            $typoClasses = $faker->boolean();
            $typoClasses = true;
        }

        $body = new static(
            suptitle: $suptitle,
            title: $title,
            headingLevelTag: $headingLevelTag,
            headingLevelDisplay: $headingLevelDisplay,
            subtitle: $subtitle,
            lead: $lead,
            text: $text,
            buttons: $buttons,
            format: $format,
            rhythm: $rhythm,
            typoClasses: $typoClasses,
            id: $id,
            class: $class,
            attrs: $attrs
        );
        return $body;
    }

    protected ?string $suptitle = '';
    protected ?string $title = '';
    protected ?int $headingLevelTag = 3;
    protected ?int $headingLevelDisplay = 3;
    protected ?string $subtitle = '';
    protected ?string $lead = '';
    protected ?string $text = '';
    protected ?array $buttons = [];
    protected ?bool $format = true;
    protected ?bool $rhythm = true;
    protected ?bool $typoClasses = true;
    protected ?string $id = null;
    protected ?string $class = null;
    protected ?array $attrs = [];

    public array $typesMap = [
        'buttons' => ButtonType::class
    ];

    public function __construct(
        ?string $suptitle = '',
        ?string $title = '',
        ?int $headingLevelTag = 3,
        ?int $headingLevelDisplay = 3,
        ?string $subtitle = '',
        ?string $lead = '',
        ?string $text = '',
        ?array $buttons = null,
        ?bool $format = true,
        ?bool $rhythm = true,
        ?bool $typoClasses = true,
        ?array $attrs = [],
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct();
        $this->suptitle = $suptitle;
        $this->title = $title;
        $this->headingLevelTag = $headingLevelTag;
        $this->headingLevelDisplay = $headingLevelDisplay;
        $this->subtitle = $subtitle;
        $this->lead = $lead;
        $this->text = $text;
        $this->buttons = $buttons === null ? [] : $buttons;
        $this->format = $format;
        $this->rhythm = $rhythm;
        $this->typoClasses = $typoClasses;
        $this->id = $id;
        $this->class = $class;
        $this->attrs = $attrs;
    }
}