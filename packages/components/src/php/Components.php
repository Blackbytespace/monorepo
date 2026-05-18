<?php

namespace Blackbyte\Components;

class Components
{

    protected object $config;
    private $components = [];

    public function __construct($config)
    {
        $this->config = $config;
    }

    public function getRootDir(): string
    {
        return $this->config->components->rootDir;
    }

    public function getComponentsList(): array
    {
        $components = [];
        $files = array_merge(
            glob($this->config->components->rootDir . '/*/component.json'),
            glob($this->config->components->rootDir . '/*/*/component.json'),
            glob($this->config->components->rootDir . '/*/*/*/component.json'),
            glob($this->config->components->rootDir . '/*/*/*/*/component.json')
        );
        foreach ($files as $file) {
            $componentRelativePath = $this->getComponentRelativePath($file);
            $components[dirname($componentRelativePath)] = $this->getComponent($componentRelativePath);
        }

        return $components;
    }

    public function getComponentsListObject(): array
    {
        $components = $this->getComponentsList();
        $components = array_map(function ($component) {
            return $component->toObject();
        }, $components);
        return $components;

    }

    public function componentExists(string $relativePath): mixed
    {
        $componentPath = $this->getComponentPath($relativePath);
        return file_exists($componentPath);
    }

    public function getComponentRelativePath(string $path): string
    {
        $relativePath = str_replace($this->config->components->rootDir . '/', '', $path);
        return $relativePath;
    }

    public function getComponentPath(string $path): string
    {
        if (str_contains($path, $this->config->components->rootDir)) {
            return $path;
        }
        return $this->config->components->rootDir . '/' . $path;
    }

    public function getComponent(string $path): mixed
    {
        $componentPath = $this->getComponentPath($path);
        if (isset($this->components[$componentPath])) {
            return $this->components[$componentPath];
        }
        if ($this->componentExists($componentPath)) {
            $component = new Component(path: $componentPath, components: $this);
            $this->components[$componentPath] = $component;
            return $component;
        }
        throw new \Exception('Component at path "' . $path . '" not found');
    }

    public function getComponentBySchemaId(string $id): mixed
    {
        foreach ($this->getComponentsList() as $component) {
            if ($component->getSchemaId() === $id) {
                return $component;
            }
        }
        throw new \Exception('No component with the schema "$id" as "' . $id . '" found');
    }

    public function getComponentById(string $id): mixed
    {
        foreach ($this->getComponentsList() as $component) {
            if ($component->getId() === $id) {
                return $component;
            }
        }
        throw new \Exception('No component with the "id" as "' . $id . '" found');
    }

    public function getComponentByPath(string $path): mixed
    {
        foreach ($this->getComponentsList() as $component) {
            if ($component->getPath() === $path) {
                return $component;
            }
            if ($component->getRelPath() === $path) {
                return $component;
            }
        }
        throw new \Exception('No component with the "path" or "relPath" as "' . $path . '" found');
    }
}