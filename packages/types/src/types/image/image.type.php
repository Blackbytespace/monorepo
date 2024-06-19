<?php

class Image extends Base
{
    public string $src = '';
    public string $title = '';
    public string $alt = '';
    // public array $sizes = [];
    public bool $lazy = true;
    public array $attrs = [];

    public function render()
    {
        $image = '<img ';

        if ($this->src) {
            $image .= "src=\"{$this->src}\" ";
        }
        
        // if (count($this->sizes)) {
        //     $image .= 'sizes="';
        //     foreach ($this->sizes as $size) {
        //         $image .= "(max-width: {$size['max-width']}) {$size['size']}, ";
        //     }
        //     $image = rtrim($image, ', ');
        //     $image .= '" ';
        // }

        if ($this->lazy) {
            $image .= 'loading="lazy" ';
        }

        if ($this->title) {
            $image .= "title=\"{$this->title}\" ";
        }

        if ($this->alt) {
            $image .= "alt=\"{$this->alt}\" ";
        }
        
        if (count($this->attrs)) {
            foreach ($this->attrs as $key => $value) {
                $image .= "$key=\"$value\" ";
            }
        }

        $image .= '/>';

        return $image;
    }

    public static function default()
    {
        return new Image([
            'src' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=',
            'attrs' => [
                'class' => '_image',
                'style' => 'object-fit: cover; background: white;',
            ]
        ]);
    }

}