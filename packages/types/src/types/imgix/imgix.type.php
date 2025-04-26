<?php

namespace Lotsof\Types;

class ImgixType extends BaseType
{
    static array $_crop = ['bottom', 'edges', 'entropy', 'faces', 'focalpoint', 'left', 'right', 'top'];

    static array $_fit = ['clamp', 'clip', 'crop', 'facearea', 'fill', 'fillmax', 'max', 'min', 'scale'];

    static array $_fm = ['avif', 'blurhash', 'gif', 'jp2', 'jpg', 'json', 'jxr', 'mp4', 'pjpg', 'png', 'png8', 'png32', 'webm', 'webp', 'auto'];


    protected string $ar;
    protected mixed $auto;
    protected mixed $blur;
    protected string $crop;
    protected int $dpi;
    protected int $dpr;
    protected string $fit;
    protected string $fm;
    protected bool $fpDebug;
    protected int $fpX;
    protected int $fpY;
    protected int $h;
    protected bool $lossless;
    protected int $minH;
    protected int $minW;
    protected int $q;
    protected int $w;

    public function __construct(
        ?string $ar = null,
        mixed $auto = null,
        mixed $blur = null,
        ?string $crop = null,
        ?int $dpi = null,
        ?int $dpr = null,
        ?string $fit = null,
        ?string $fm = null,
        ?bool $fpDebug = null,
        ?int $fpX = null,
        ?int $fpY = null,
        ?int $h = null,
        ?bool $lossless = null,
        ?int $minH = null,
        ?int $minW = null,
        ?int $q = null,
        ?int $w = null
    ) {
        parent::__construct();
        $this->ar = $ar;
        $this->auto = $auto;
        $this->blur = $blur;
        $this->crop = $crop;
        $this->dpi = $dpi;
        $this->dpr = $dpr;
        $this->fit = $fit;
        $this->fm = $fm;
        $this->fpDebug = $fpDebug;
        $this->fpX = $fpX;
        $this->fpY = $fpY;
        $this->h = $h;
        $this->lossless = $lossless;
        $this->minH = $minH;
        $this->minW = $minW;
        $this->q = $q;
        $this->w = $w;
    }
}