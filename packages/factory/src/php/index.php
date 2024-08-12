<?php

// Load all dependencies
require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/_autoload.php';
require_once __DIR__ . '/router/Router.php';

// Load all components
$files = glob(__DIR__ . '/../components/**/*.component.php');
foreach ($files as $file) {
    require_once $file;
}

$router = new \Factory\Router();

$router->addRoute('GET', '/component/:name', function ($name) {

    // try to find the component
    $componentsSettings = \Factory\Config\get('components');

    if (!file_exists($componentsSettings->rootDir . '/' . $name)) {
        throw new \Exception('Component "' . $name . '" not found');
    }

    print \Components\Renderer\render('component.component', [
        'name' => $name
    ]);
    exit;
});

$router->matchRoute();


