<?php

namespace Factory\Renderers;

function blade(object $component, array $data, object $config): string
{
    // make sure we have a temp directory to store the cache
    $tmpDir = sys_get_temp_dir();
    $cacheDir = $tmpDir . '/sFactoryBladeCache';
    if (!is_dir($cacheDir)) {
        mkdir($cacheDir);
    }

    // render the view
    $relPath = \Sugar\Fs\relativePath($config->components->rootDir, $component->path);
    $viewPath = $relPath . '.' . basename($component->path) . '';
    $blade = new \eftec\bladeone\BladeOne($config->components->rootDir, $cacheDir, \eftec\bladeone\BladeOne::MODE_DEBUG);
    return $blade->run($viewPath, $data);
}