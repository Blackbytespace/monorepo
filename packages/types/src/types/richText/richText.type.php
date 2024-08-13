<?php

namespace Lotsof\Types;

class RichTextType extends BaseType
{
    public static function mock(?bool $p = true, ?bool $ul = true, ?bool $ol = true, ?bool $dl = true, ?bool $strong = true, ?bool $em = true, ?bool $sup = true, ?bool $sub = true, ?bool $small = true, ?bool $code = true, ?bool $a = true, ?bool $blockquote = true, ?bool $h1 = true, ?bool $h2 = true, ?bool $h3 = true, ?bool $h4 = true, ?bool $h5 = true, ?bool $h6 = true, ?string $id = null): RichTextType
    {
        $faker = \Faker\Factory::create();

        $text = \Sugar\faker\richText(
            p: $p,
            ul: $ul,
            ol: $ol,
            dl: $dl,
            strong: $strong,
            em: $em,
            sup: $sup,
            sub: $sub,
            small: $small,
            code: $code,
            a: $a,
            blockquote: $blockquote,
            h1: $h1,
            h2: $h2,
            h3: $h3,
            h4: $h4,
            h5: $h5,
            h6: $h6
        );

        $richText = new static(
            id: $id,
            text: $text
        );
        return $richText;
    }

    protected string $text;

    public function __construct(?string $text = '', ?string $id = null)
    {
        parent::__construct($id);
        $this->text = $text;
    }
}