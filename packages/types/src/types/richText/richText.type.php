<?php

namespace Lotsof\Types;

class RichText extends Base
{
    public static function mock(?bool $p = true, ?bool $ul = true, ?bool $ol = true, ?bool $dl = true, ?bool $strong = true, ?bool $em = true, ?bool $sup = true, ?bool $sub = true, ?bool $small = true, ?bool $code = true, ?bool $a = true, ?bool $blockquote = true, ?bool $h1 = true, ?bool $h2 = true, ?bool $h3 = true, ?bool $h4 = true, ?bool $h5 = true, ?bool $h6 = true): RichText
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
            text: $text,
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
        return $richText;
    }

    protected string $text;
    protected ?bool $p;
    protected ?bool $ul;
    protected ?bool $ol;
    protected ?bool $dl;
    protected ?bool $strong;
    protected ?bool $em;
    protected ?bool $sup;
    protected ?bool $sub;
    protected ?bool $small;
    protected ?bool $code;
    protected ?bool $a;
    protected ?bool $blockquote;
    protected ?bool $h1;
    protected ?bool $h2;
    protected ?bool $h3;
    protected ?bool $h4;
    protected ?bool $h5;
    protected ?bool $h6;


    public function __construct(string $text, ?bool $p = true, ?bool $ul = true, ?bool $ol = true, ?bool $dl = true, ?bool $strong = true, ?bool $em = true, ?bool $sup = true, ?bool $sub = true, ?bool $small = true, ?bool $code = true, ?bool $a = true, ?bool $blockquote = true, ?bool $h1 = true, ?bool $h2 = true, ?bool $h3 = true, ?bool $h4 = true, ?bool $h5 = true, ?bool $h6 = true)
    {
        $this->text = $text;
        $this->p = $p;
        $this->ul = $ul;
        $this->ol = $ol;
        $this->dl = $dl;
        $this->strong = $strong;
        $this->em = $em;
        $this->sup = $sup;
        $this->sub = $sub;
        $this->small = $small;
        $this->code = $code;
        $this->a = $a;
        $this->blockquote = $blockquote;
        $this->h1 = $h1;
        $this->h2 = $h2;
        $this->h3 = $h3;
        $this->h4 = $h4;
        $this->h5 = $h5;
        $this->h6 = $h6;
    }
}