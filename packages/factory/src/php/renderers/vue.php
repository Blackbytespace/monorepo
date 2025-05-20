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

    $carpenterComponentJson = json_encode($component->toObject());

    $componentId = $component->getId();
    $html = <<<HTML
        <div id="{$componentId}" type="carpenter/component">
            <div id="{$componentId}-root"></div>
            <script type="application/json" id="{$componentId}-data">{$carpenterComponentJson}</script>
            <script type="module" id="{$componentId}-script">
                import { createApp } from 'https://unpkg.com/vue@3.5/dist/vue.esm-browser.js'
                import __Component from '{$componentUrl}';
                const componentData = JSON.parse(document.getElementById('{$componentId}-data')?.innerText?.trim() ?? '{}');       
                createApp(__Component, componentData?.values ?? {}).mount('#{$componentId}-root');
            </script>
        </div>
    HTML;

    return $html;
}