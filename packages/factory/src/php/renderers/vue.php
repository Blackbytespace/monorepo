<?php

namespace Factory\Renderers;

function vue(object $component, object $config): string
{
    $componentPath = $component->getPath() . '/' . $component->getShortName() . '.vue';
    $componentUrl = \Factory\Project\assetViteUrl($componentPath);
    // $mockPath = $component->getJsCompatibleMockPath('vue');
    // $mockUrl = '';
    // if ($mockPath) {
    //     $mockUrl = \Factory\Project\assetViteUrl($mockPath);
    // }

    // if (!$component->hasValues()) {
    //     $valuesJs = <<<JS
    //         import __values from '{$mockUrl}';
    //     JS;
    // } else {
    //     $values = $component->getValues();
    //     $valuesJson = json_encode($values);
    //     $valuesJs = <<<JS
    //         const __values = JSON.parse('$valuesJson'.replace(/\\\/gm, ''));
    //     JS;
    // }

    $componentId = $component->getId();
    $componentName = $component->getName();
    $componentSpecs = json_encode($component->toObject());

    $html = <<<HTML
            <div id="{$componentId}-root" style="width: 100%;">
                <script type="module">
                    import { createApp } from 'https://unpkg.com/vue@3.5/dist/vue.esm-browser.js';
                    import __Component from '{$componentUrl}';
                    if (!window._carpenterComponents?.['{$componentId}']) {
                        // create the vue app with the VueProxy component
                        let props = {
                            id: '{$componentId}',
                            component: __Component,
                            specs: {$componentSpecs}
                        };
                        
                        // get the props from the component
                        const app = createApp(window.__CarpenterVueProxy, props);
                        app.mount('#{$componentId}-root');
                    }
                </script>
            </div>
            
    HTML;

    return $html;
}