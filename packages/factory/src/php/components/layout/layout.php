<?php

namespace Factory\Components\Layout;

function render(\Lotsof\Components\Component $component, mixed $config): string
{
    $css = [];
    $js = [];
    if (isset($config->ui->assets)) {
        foreach ($config->ui->assets as $key => $asset) {
            if (str_contains($asset, '.css')) {
                $css[] = <<<HTML
                    <link id="factory-{$key}" rel="stylesheet" href="$asset" />
                HTML;
            } else if (str_contains($asset, '.js') || str_contains($asset, '.ts')) {
                $js[] = <<<HTML
                    <script id="factory-{$key}" type="module" src="$asset"></script>
                HTML;
            }
        }
    }
    $css = implode("\n", $css);
    $js = implode("\n", $js);
    $title = 'Factory - ' . $component->getName();

    $isInIframe = isset($_SERVER['HTTP_SEC_FETCH_DEST']) && $_SERVER['HTTP_SEC_FETCH_DEST'] === 'iframe';

    $factoryHtml = '';
    if (!$isInIframe) {
        $factoryHtml = <<<HTML
            <s-factory lnf id="s-factory"></s-factory>
        HTML;
    }


    return <<<HTML
        <!DOCTYPE html>
        <html>
            <head>
                <title>$title</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta charset="UTF-8">
                $css
                $js
            </head>
            <body>
                $factoryHtml
            </body>
        </html>
    HTML;

}