<?php

namespace Lotsof\Components;

class Component
{

    protected object $values;
    protected string $path;
    protected object $json;
    protected string $schemaId;

    private ?\Lotsof\Components\Components $components;


    public function __construct(string $path, ?object $values = null, ?\Lotsof\Components\Components $components = null)
    {
        if ($components) {
            $this->path = $components->getComponentPath($path);
        } else {
            $this->path = $path;
        }

        // make sure we have a directory to write in
        if (!file_exists($this->path)) {
            mkdir($this->path);
        }

        // save the components instance
        $this->components = $components;

        // set the values
        if ($values) {
            $this->values = $values;
        } else {
            $this->values = (object) [];
        }
        $this->path = str_replace('/component.json', '', $path);
        $this->json = $this->getComponentJson();

        // get the json schema id
        $jsonSchema = $this->getJsonSchema(resolveRefs: false);
        if (isset($jsonSchema->{'$id'})) {
            $this->schemaId = $jsonSchema->{'$id'};
        } else {
            $this->schemaId = '';
        }
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getName(): string
    {
        return $this->json->name;
    }

    public function getDescription(): string
    {
        return $this->json->description;
    }

    public function getVersion(): string
    {
        return $this->json->version;
    }

    public function setValues(object $values): void
    {
        $this->values = $values;
    }

    public function getValues(): object
    {
        return $this->values;
    }

    public function hasValues(): bool
    {
        return count((array) $this->values) > 0;
    }

    public function getSchemaId(): string
    {
        return $this->schemaId;
    }

    public function toObject(): object
    {
        return (object) [
            'path' => $this->path,
            'name' => $this->json->name,
            'description' => $this->getDescription(),
            'version' => $this->getVersion(),
            'json' => $this->json,
            'files' => $this->getFiles(),
            'engines' => $this->getEngines(),
            'mocks' => $this->getMocks(),
            'schema' => $this->getJsonSchema(),
            'values' => $this->getValues(),
            'savedValues' => $this->getSavedValues()
        ];
    }

    public function getSavedValues(): object
    {

        $result = [];

        $savedValuesFiles = glob($this->path . '/.values/*.values.json');

        if (!count($savedValuesFiles)) {
            return (object) [];
        }

        foreach ($savedValuesFiles as $file) {
            $values = json_decode(file_get_contents($file));
            $result[basename($file)] = $values;
        }

        return (object) $result;
    }

    public function saveValues(object $values, string $name): string
    {
        // create the filename and the path to file
        $fileName = \Sugar\String\fileNameCompliant($name) . '.values.json';
        $fileName = strtolower($fileName);
        $valuesDir = $this->path . '/.values';
        $filePath = $valuesDir . '/' . $fileName;

        // make sure we have a directory to write in
        if (!file_exists($valuesDir)) {
            mkdir($valuesDir);
        }

        // sanitize the values
        $values = \Sugar\Object\deepFilter($values, function ($prop, $value) {
            if ($prop === '_metas' || $prop === 'typesMap') {
                return false;
            }
            return true;
        });

        // save the actual values
        file_put_contents($filePath, json_encode([
            'name' => $name,
            'values' => $values
        ], JSON_PRETTY_PRINT));

        // return the file path for convinience
        return $filePath;
    }

    public function getFiles(): array
    {
        $files = glob($this->path . '/*');
        $files = array_merge($files, glob($this->path . '/**/*'));
        return $files;
    }

    public function getComponentJson(): ?object
    {
        $componentJsonPath = $this->path . '/component.json';
        if (!file_exists($componentJsonPath)) {
            return null;
        }
        $componentJson = json_decode(file_get_contents($componentJsonPath));
        return $componentJson;
    }

    public function getEngines(): array
    {
        // build a list of supported engines extensions for glob
        $enginesExtensions = [];
        foreach (FACTORY_SUPPORTED_ENGINES as $engine => $extensions) {
            $enginesExtensions = array_merge($enginesExtensions, $extensions);
        }

        // check for ".preview" files
        $files = glob($this->path . '/*{' . implode(',', $enginesExtensions) . '}', GLOB_BRACE);

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

    public function getPhpCompatibleMockPath(string $engine): string
    {
        $mocks = $this->getMocks();
        if (isset($mocks[$engine])) {
            foreach ($mocks[$engine] as $mockPath) {
                $mockExt = pathinfo($mockPath, PATHINFO_EXTENSION);
                if (!in_array($mockExt, ['json', 'php'])) {
                    continue;
                }
                return $mockPath;
            }
        }
        return '';
    }

    public function getJsCompatibleMockPath(string $engine): string
    {
        $mocks = $this->getMocks();
        if (isset($mocks[$engine])) {
            foreach ($mocks[$engine] as $mockPath) {
                $mockExt = pathinfo($mockPath, PATHINFO_EXTENSION);
                if (!in_array($mockExt, ['json', 'js', 'ts'])) {
                    continue;
                }
                return $mockPath;
            }
        }
        return '';
    }

    public function getMocks(): array
    {
        // build a list of supported engines extensions for glob
        $mocksExtensions = [];
        foreach (FACTORY_SUPPORTED_MOCKS_BY_ENGINES as $engine => $extensions) {
            $mocksExtensions = array_merge($mocksExtensions, $extensions);
        }

        // check for ".preview" files
        $files = glob($this->path . '/*{' . implode(',', $mocksExtensions) . '}', GLOB_BRACE);

        // build the supported engines list
        $supportedEngines = [];
        foreach ($files as $filePath) {
            foreach (FACTORY_SUPPORTED_MOCKS_BY_ENGINES as $engine => $extensions) {
                if (preg_match('/(' . implode('|', $extensions) . ')$/', $filePath)) {
                    if (!isset($supportedEngines[$engine])) {
                        $supportedEngines[$engine] = [];
                    }
                    if (!in_array($filePath, $supportedEngines[$engine])) {
                        $supportedEngines[$engine][] = $filePath;
                    }
                }
            }
        }

        return $supportedEngines;
    }

    public function getJsonSchema(?bool $resolveRefs = true): mixed
    {
        $componentSchemaPath = $this->path . '/' . $this->getName() . '.schema.json';
        if (!file_exists($componentSchemaPath)) {
            return null;
        }
        $jsonSchema = json_decode(file_get_contents($componentSchemaPath));

        // resolve $ref properties
        if ($resolveRefs) {
            $jsonSchema = $this->_resolveSchemaRefs($jsonSchema, $componentSchemaPath);
        }

        return $jsonSchema;
    }

    private function _resolveSchemaRefs(object $schema, string $schemaPath): object
    {

        $currentPath = realpath($schemaPath);

        // resolve $ref properties
        $schema = \Sugar\Object\deepMap($schema, function ($prop, &$value, &$object) use ($schemaPath, &$currentPath) {
            if ($prop === '$ref') {

                if ($this->components) {
                    $refComponent = $this->components->getComponentBySchemaId($value);
                    if ($refComponent) {
                        $jsonSchema = $refComponent->getJsonSchema(resolveRefs: false);
                        foreach ($jsonSchema as $key => $val) {
                            $object->$key = $val;
                        }
                    }
                }

                // print dirname($currentPath) . '/' . $value . " ----<br />";
                // $relPath = realpath(dirname($currentPath) . '/' . $value);
                // print $relPath . "<br />";
                // if (!file_exists($relPath)) {
                //     throw new \Exception('Schema "' . $relPath . '" file not found referenced in "' . $currentPath . '"');
                // }
                // $schema = file_get_contents($relPath);
                // $schema = json_decode($schema);
                // foreach ($schema as $key => $val) {
                //     $object->$key = $val;
                // }
                // $currentPath = $relPath;
                return -1;
            }
            return $value;
        });

        // remove all $ref properties
        $schema = \Sugar\Object\deepFilter($schema, function ($prop, $value) {
            if ($prop === '$ref') {
                return false;
            }
            return true;
        });

        return $schema;
    }

}