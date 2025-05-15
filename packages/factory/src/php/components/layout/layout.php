<?php

namespace Factory\Components\Layout;

function render(\Lotsof\Components\Component $component, mixed $config): string
{
    $css = [];
    $js = [];
    if (isset($config->ui->assets)) {
        foreach ($config->ui->assets as $asset) {
            if (str_contains($asset, '.css')) {
                $css[] = <<<HTML
                    <link rel="stylesheet" href="$asset" />
                HTML;
            } else if (str_contains($asset, '.js') || str_contains($asset, '.ts')) {
                $js[] = <<<HTML
                    <script type="module" src="$asset"></script>
                HTML;
            }
        }
    }
    $css = implode("\n", $css);
    $js = implode("\n", $js);
    $title = 'Factory - ' . $component->getName();

    return <<<HTML
        <html>
            <head>
                <title>$title</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta charset="UTF-8">
                $css
                $js
            </head>
            <body>
                <s-factory lnf id="s-factory"></s-factory>
            </body>
        </html>
    HTML;

}