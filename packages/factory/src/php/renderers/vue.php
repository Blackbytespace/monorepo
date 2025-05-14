<?php

namespace Factory\Renderers;

function vue(object $component, object $config): string
{
    $componentPath = $component->getPath() . '/' . $component->getShortName() . '.vue';
    $componentUrl = \Factory\Project\assetViteUrl($componentPath);
    $mockPath = $component->getJsCompatibleMockPath('vue');
    $mockUrl = '';
    if ($mockPath) {
        $mockUrl = \Factory\Project\assetViteUrl($mockPath);
    }

    $valuesJs = '';
    if (!$component->hasValues()) {
        $valuesJs = <<<JS
            import __values from '{$mockUrl}';
        JS;
    } else {
        $values = $component->getValues();
        $valuesJson = json_encode($values);
        $valuesJs = <<<JS
            const __values = JSON.parse('$valuesJson'.replace(/\\\/gm, ''));
        JS;
    }

    $componentId = $component->getId();
    $html = <<<HTML
        <div id="{$componentId}-container" type="lotsof/component">
            <div id="{$componentId}"></div> 
            <script type="module">
                import { createApp } from 'https://unpkg.com/vue@3.5/dist/vue.esm-browser.js'
                import __Component from '{$componentUrl}';
                {$valuesJs}
                createApp(__Component, __values ?? {}).mount('#{$componentId}');
            </script>
        </div>
    HTML;

    return $html;

}