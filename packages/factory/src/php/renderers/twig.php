<?php

namespace Factory\Renderers;

function twig(object $component, array $data, object $config): string
{
    // make sure we have a temp directory to store the cache
    $tmpDir = sys_get_temp_dir();
    $cacheDir = $tmpDir . '/sFactoryTwigCache';
    if (!is_dir($cacheDir)) {
        mkdir($cacheDir);
    }

    $twigLoader = new \Twig\Loader\FilesystemLoader($config->components->rootDir);
    $twig = new \Twig\Environment($twigLoader, [
        // 'cache' => $cacheDir,
    ]);

    // render the view
    $relPath = \Sugar\Fs\relativePath($config->components->rootDir, $component->path);
    $viewPath = $relPath . '/' . basename($component->path) . '.twig';
    return $twig->render($viewPath, (array) $data);
}