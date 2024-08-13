<?php

namespace Factory\Components;

function listComponents()
{
    $config = \Factory\Config\get();
    $components = [];
    $files = glob($config->components->rootDir . '/**/component.json');
    foreach ($files as $file) {
        $componentJson = json_decode(file_get_contents($file));
        $componentJson->path = dirname($file);
        $components[$componentJson->name] = getComponent($componentJson->name);
    }
    return $components;
}

function getComponentEngines(string $name): array
{
    // get the component using it's name
    $component = getComponent($name, false);

    // build a list of supported engines extensions for glob
    $enginesExtensions = [];
    foreach (FACTORY_SUPPORTED_ENGINES as $engine => $extensions) {
        $enginesExtensions = array_merge($enginesExtensions, $extensions);
    }

    // check for ".preview" files
    $files = glob($component->path . '/*{' . implode(',', $enginesExtensions) . '}', GLOB_BRACE);

    // build the supported engines list
    $supportedEngines = [];
    foreach ($files as $filePath) {
        foreach (FACTORY_SUPPORTED_ENGINES as $engine => $extensions) {
            if (preg_match('/(' . implode('|', $extensions) . ')$/', $filePath)) {
                $supportedEngines[] = $engine;
            }
        }
    }

    return $supportedEngines;
}

function getMockFilesByEngine(string $name): array
{
    // get the component using it's name
    $component = getComponent($name, false);

    // build a list of supported engines extensions for glob
    $mocksExtensions = [];
    foreach (FACTORY_SUPPORTED_MOCKS_BY_ENGINES as $engine => $extensions) {
        $mocksExtensions = array_merge($mocksExtensions, $extensions);
    }

    // check for ".preview" files
    $files = glob($component->path . '/*{' . implode(',', $mocksExtensions) . '}', GLOB_BRACE);

    // build the supported engines list
    $supportedEngines = [];
    foreach ($files as $filePath) {
        foreach (FACTORY_SUPPORTED_MOCKS_BY_ENGINES as $engine => $extensions) {
            if (preg_match('/(' . implode('|', $extensions) . ')$/', $filePath)) {
                $supportedEngines[$engine] = $filePath;
            }
        }
    }

    return $supportedEngines;
}

function componentExists(string $name): mixed
{
    $config = \Factory\Config\get();
    $componentPath = $config->components->rootDir . '/' . $name;
    return file_exists($componentPath);
}

function getComponent(string $name, ?bool $details = true): mixed
{

    $config = \Factory\Config\get();
    $componentPath = $config->components->rootDir . '/' . $name;
    if (!file_exists($componentPath)) {
        throw new \Exception('Component "' . $name . '" not found');
    }
    $componentJson = json_decode(file_get_contents($componentPath . '/component.json'));

    $files = glob($componentPath . '/*');
    $files = array_merge($files, glob($componentPath . '/**/*'));

    $component = (object) [
        'name' => $componentJson->name,
        'description' => $componentJson->description,
        'version' => $componentJson->version,
        'files' => $files,
    ];

    // add the path to the component json
    $component->path = $componentPath;

    // add the supported engines
    if ($details) {
        $component->engines = getComponentEngines($name);
    }

    // add the supported mocks
    if ($details) {
        $component->mocks = getMockFilesByEngine($name);
    }

    // add the original json
    $component->json = $componentJson;

    return $component;
}