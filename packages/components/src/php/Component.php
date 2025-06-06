<?php

namespace Lotsof\Components;

class Component
{

    private object $_values;
    private string $_path;
    private object $_componentJson;
    private string $_schemaId;
    private string $_id;
    private ?\Lotsof\Components\Components $components;

    public function __construct(string $path, ?object $values = null, ?string $id = null, ?\Lotsof\Components\Components $components = null)
    {
        // uid
        if ($id) {
            $this->_id = $id;
        } else {
            $this->_id = 's-component-' . uniqid();
        }

        if ($components) {
            $this->_path = $components->getComponentPath($path);
        } else {
            $this->_path = $path;
        }

        // make sure we have a directory to write in
        if (!file_exists($this->_path)) {
            mkdir($this->_path);
        }

        // save the components instance
        $this->components = $components;

        // set the values
        if ($values) {
            $this->_values = $values;
        } else {
            $this->_values = (object) [];
        }
        $this->_path = str_replace('/component.json', '', $path);
        $this->_componentJson = $this->getComponentJson();

        // get the json schema id
        $jsonSchema = $this->getJsonSchema(resolveRefs: false);
        if (isset($jsonSchema->{'$id'})) {
            $this->_schemaId = $jsonSchema->{'$id'};
        } else {
            $this->_schemaId = '';
        }
    }

    public function getPath(): string
    {
        return $this->_path;
    }

    public function getRelPath(): string
    {
        return str_replace($this->components->getRootDir() . '/', '', $this->_path);
    }

    public function getShortName(): string
    {
        $parts = explode('/', $this->_componentJson->name);
        if (count($parts) > 1) {
            return $parts[1];
        }
        return $parts[0];
    }

    public function getName(): string
    {
        return $this->_componentJson->name;
    }

    public function getOrganization(): string
    {
        $parts = explode('/', $this->_componentJson->name);
        if (count($parts) > 1) {
            return $parts[0];
        }
        return '';
    }

    public function getId(): string
    {
        return $this->_id;
    }

    public function setId(string $id): void
    {
        $this->_id = $id;
    }

    public function getType(): string
    {
        if (isset($this->_componentJson->type) && !empty($this->_componentJson->type)) {
            return $this->_componentJson->type;
        }
        return 'unknown';
    }

    public function getIcon(): string
    {
        if (isset($this->_componentJson->icon) && !empty($this->_componentJson->icon)) {
            return $this->_componentJson->icon;
        }
        return '';
    }

    public function getDescription(): string
    {
        return $this->_componentJson->description;
    }

    public function getVersion(): string
    {
        return $this->_componentJson->version;
    }

    public function setValues(mixed $values): void
    {
        if (is_null($values)) {
            $values = (object) [];
        } else {
            $this->_values = $values;
        }
    }

    public function getValues(): object
    {
        return $this->_values;
    }

    public function hasValues(): bool
    {
        return count((array) $this->_values) > 0;
    }

    public function getSchemaId(): string
    {
        return $this->_schemaId;
    }

    public function toObject(): object
    {
        return (object) [
            'id' => $this->getId(),
            'name' => $this->getName(),
            'shortName' => $this->getShortName(),
            'organization' => $this->getOrganization(),
            'description' => $this->getDescription(),
            'version' => $this->getVersion(),
            'icon' => $this->getIcon(),
            'path' => $this->getPath(),
            'relPath' => $this->getRelPath(),
            'type' => $this->getType(),
            'json' => $this->_componentJson,
            'savedValues' => $this->getSavedValues(),
            'schema' => $this->getJsonSchema(),
            'values' => $this->getValues(),
            'files' => $this->getFiles(),
            'engines' => $this->getEngines(),
            'mocks' => $this->getMocks(),
        ];
    }

    public function getSavedValues(): object
    {

        $result = [];

        $savedValuesFiles = glob($this->_path . '/.values/*.values.json');

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
        $valuesDir = $this->_path . '/.values';
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
        $files = glob($this->_path . '/*');
        $files = array_merge($files, glob($this->_path . '/**/*'));
        return $files;
    }

    public function getComponentJson(): ?object
    {
        $componentJsonPath = $this->_path . '/component.json';
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
        $files = glob($this->_path . '/*{' . implode(',', $enginesExtensions) . '}', GLOB_BRACE);

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
        $files = glob($this->_path . '/*{' . implode(',', $mocksExtensions) . '}', GLOB_BRACE);

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
        $componentSchemaPath = $this->_path . '/' . $this->getShortName() . '.schema.json';
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