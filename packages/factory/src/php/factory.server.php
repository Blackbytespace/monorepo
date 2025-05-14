<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Load all dependencies
require_once __DIR__ . '/_requires.php';

$app = AppFactory::create();

// load the project vendors
if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php')) {
    require_once $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
}

// load the config
$config = \Lotsof\Factory\Config\get();

// create a components instance
$components = new \Lotsof\Components\Components($config);

// load the components index.php if exists
if (file_exists($config->components->rootDir . '/index.php')) {
    require_once $config->components->rootDir . '/index.php';
}

// load all components
$files = glob(__DIR__ . '/components/**/*.component.php');
foreach ($files as $file) {
    require_once $file;
}

$app->get('/api/specs', function (Request $request, Response $response, $args) {

    // try to find the component
    global $config;
    global $components;

    $componentsList = $components->getComponentsListObject();

    $payload = json_encode((object) [
        'components' => $componentsList,
        'config' => $config
    ]);

    $response->getBody()->write($payload);
    return $response
        ->withHeader('Content-Type', 'application/json');

});

$app->get('/component[/{path:.*}]', function (Request $request, Response $response, $args) {

    global $config;
    global $components;

    $componentsToDisplay = explode('+', $args['path']);

    $html = [];

    foreach ($componentsToDisplay as $componentPath) {
        // try to find the component
        if (!file_exists($config->components->rootDir . '/' . $componentPath)) {
            throw new \Exception('Component "' . $componentPath . '" not found');
        }
    }

    $component = $components->getComponent($componentsToDisplay[0]);

    $html[] = \Factory\Components\Layout\render($component, $config);

    $response->getBody()->write(implode("\n", $html));
    return $response;
});

$app->post('/api/render[/{path:.*}]', function (Request $request, Response $response, $args) {

    global $config;
    global $components;

    // get the posted data
    $path = $args['path'];
    $body = (object) $request->getParsedBody();

    // get the component
    $component = $components->getComponent($path);
    if (isset($body->id)) {
        $component->setId($body->id);
    }

    $engines = $component->getEngines();
    // $mocks = $component->getMocks();
    $savedValues = $component->getSavedValues();

    // get the engine from the url
    $engine = $request->getQueryParams()['engine'] ?? $engines[0];

    // set values if passed in the body
    if (isset($body->values)) {
        $component->setValues(json_decode($body->values));
    }

    // check if the engine is supported
    if (!in_array($engine, $engines)) {
        throw new \Exception('Engine "' . $engine . '" not supported on the component "' . $id . '". Here are the supported engines: ' . implode(', ', $engines));
    }

    // preparing mock data
    if (!$component->hasValues()) {
        $mockPath = $component->getPhpCompatibleMockPath($engine);
        if ($mockPath) {
            $mockData = require $mockPath;
            $component->setValues($mockData);
        }
    }

    // switch on the engines
    $html = '';
    switch ($engine) {
        case 'blade':
            $html = \Factory\Renderers\blade($component, $config);
            break;
        case 'twig':
            $html = \Factory\Renderers\twig($component, $config);
            break;
        case 'react':
            $html = \Factory\Renderers\react($component, $config);
            break;
        case 'vue':
            $html = \Factory\Renderers\vue($component, $config);
            break;
    }

    // add the assets from the project
    foreach ($config->project->assets as $asset) {

        // build correct url
        $url = \Factory\Project\assetUrl($asset);

        // add the asset to the html
        if (str_contains($asset, '.css')) {
            $html .= '<link rel="stylesheet" href="' . $url . '">';
        } else if (str_contains($asset, '.js') || str_contains($asset, '.ts')) {
            $html .= '<script type="module" src="' . $url . '"></script>';
        }
    }

    $response->getBody()->write(json_encode((object) [
        'html' => $html,
        'values' => $component->getValues(),
        'savedValues' => $savedValues
    ]));

    return $response
        ->withHeader('Content-Type', 'application/json');
});

// $router->addRoute('GET', '/component/:id/:engine?', function (string $id) {
//     global $config;

//     // try to find the component
//     if (!file_exists($config->components->rootDir . '/' . $id)) {
//         throw new \Exception('Component "' . $id . '" not found');
//     }

//     print \Components\Renderer\render('component.component', [
//         'name' => $id,
//         'ui' => $config->ui
//     ]);
//     exit;
// });

// $router->addRoute('POST', '/api/render/:id/:engine', function (string $id, ?string $engine = '') {

//     global $config;
//     global $components;

//     // get the raw POST data
//     $rawData = file_get_contents("php://input");
//     $postedData = json_decode($rawData);

//     // get the component
//     $component = $components->getComponent($id);
//     $engines = $component->getEngines();
//     $mocks = $component->getMocks();
//     $savedValues = $component->getSavedValues();

//     if (isset($postedData->values)) {
//         $component->setValues($postedData->values);
//     }

//     // set the default engine if not passed in url
//     if ($engine === '') {
//         $engine = $engines[0];
//     }

//     // check if the engine is supported
//     if (!in_array($engine, $engines)) {
//         throw new \Exception('Engine "' . $engine . '" not supported on the component "' . $id . '". Here are the supported engines: ' . implode(', ', $engines));
//     }

//     // preparing mock data
//     if (!$component->hasValues()) {
//         $mockPath = $component->getPhpCompatibleMockPath($engine);
//         if ($mockPath) {
//             $mockData = require $mockPath;
//             $component->setValues($mockData);
//         }
//     }

//     // switch on the engines
//     $html = '';
//     switch ($engine) {
//         case 'blade':
//             $html = \Factory\Renderers\blade($component, $config);
//             break;
//         case 'twig':
//             $html = \Factory\Renderers\twig($component, $config);
//             break;
//         case 'react':
//             $html = \Factory\Renderers\react($component, $config);
//             break;
//         case 'vue':
//             $html = \Factory\Renderers\vue($component, $config);
//             break;
//     }

//     // $component->getSavedValues();

//     // add the assets from the project
//     foreach ($config->project->assets as $asset) {

//         // build correct url
//         $url = \Factory\Project\assetUrl($asset);

//         // add the asset to the html
//         if (str_contains($asset, '.css')) {
//             $html .= '<link rel="stylesheet" href="' . $url . '">';
//         } else if (str_contains($asset, '.js') || str_contains($asset, '.ts')) {
//             $html .= '<script type="module" src="' . $url . '"></script>';
//         }
//     }

//     print json_encode((object) [
//         'html' => $html,
//         'values' => $component->getValues(),
//         'savedValues' => $savedValues
//     ]);

//     exit;
// });

// $router->addRoute('POST', '/api/saveValues/:id', function (string $id) {

//     global $config;
//     global $components;

//     // get the raw POST data
//     $rawData = file_get_contents("php://input");
//     $postedData = json_decode($rawData);

//     // get the component
//     $component = $components->getComponent($id);

//     // save the values
//     $filePath = $component->saveValues($postedData->values, $postedData->name);

//     // set the values in the component
//     if (isset($postedData->values)) {
//         $component->setValues($postedData->values);
//     }

//     print json_encode((object) [
//         'path' => $filePath,
//         'values' => $component->getValues()
//     ]);

//     exit;
// });

// $router->matchRoute();

$app->run();
