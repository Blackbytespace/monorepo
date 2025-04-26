<?php

define('FACTORY_SUPPORTED_ENGINES', [
    // 'component' => ['.preview.php'],
    'blade' => ['.blade.php'],
    'twig' => ['.twig'],
    'react' => ['.jsx', '.tsx'],
    'vue' => ['.vue'],
    'lit' => ['.lit.ts'],
]);

define('FACTORY_SUPPORTED_MOCKS_BY_ENGINES', [
    // 'component' => ['.mock.php'],
    'blade' => ['.mock.php'],
    'twig' => ['.mock.php'],
    // 'react' => ['.mock.js', '.mock.ts'],
    'vue' => ['.mock.ts', '.mock.php'],
    // 'lit' => ['.mock.js', '.mock.ts'],
]);