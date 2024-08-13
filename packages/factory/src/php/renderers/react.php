<?php

namespace Factory\Renderers;

function react(object $component, array $data, object $config): string
{
    $componentPath = $config->components->rootDir . '/' . $component->name . '/' . $component->name . '.tsx';
    $componentUrl = \Factory\Project\assetViteUrl($componentPath);
    $mockUrl = '';
    if ($component->mocks['react']) {
        $mockUrl = \Factory\Project\assetViteUrl($component->mocks['react']);
    }


    $mockImport = 'function __mock() { return {}; }';
    if ($mockUrl != '') {
        $mockImport = "import __mock from '{$mockUrl}';";
    }


    $html = <<<HTML
        <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>

        <div id="s-factory-root"></div>

        <script defer type="module">
            import __Component from '{$componentUrl}';
            {$mockImport}

            const container = document.getElementById('s-factory-root');
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(__Component, __mock()));
        </script>
    HTML;

    return $html;

}