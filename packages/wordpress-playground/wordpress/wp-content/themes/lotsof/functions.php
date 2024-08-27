<?php

// remove deprecation warnings
// @error_reporting(E_ALL & ~E_DEPRECATED);

/**
 * Load vendors
 */
require_once __DIR__ . '/vendor/autoload.php';

/**
 * Components
 */
require_once __DIR__ . '/src/components/index.php';

/**
 * Needed metas like viewport, etc...
 */
add_action('wp_head', function () {
    print '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
});

/**
 * Proper way to enqueue scripts and styles
 */
add_action('wp_head', function () {

    $cssUrl = '';
    $jsUrl = '';

    // project style and js
    switch ($_ENV['ENVIRONMENT']) {
        case 'development':
            $cssUrl = 'http://0.0.0.0:5173/src/css/index.css';
            $jsUrl = 'http://0.0.0.0:5173/src/js/index.ts';
            break;
        default:
            // get the index css and js of the build in the dist folder
            $css = glob(__DIR__ . '/dist/assets/*.css');
            $js = glob(__DIR__ . '/dist/assets/*.js');
            $cssUrl = get_theme_root_uri() . '/lotsof/dist/assets/' . basename($css[0]);
            $jsUrl = get_theme_root_uri() . '/lotsof/dist/assets/' . basename($js[0]);
            break;
    }

    print <<<HTML
        <link rel="stylesheet" href="{$cssUrl}" />
        <script type="module" src="{$jsUrl}" defer></script>
    HTML;
});

/**
 * Unregister some post types
 */
add_action('init', function () {
    // unregister_post_type('project');
}, 100);


add_filter('acf/settings/save_json', function ($path) {
    return get_stylesheet_directory() . '/src/acf';
});


add_filter('acf/settings/load_json', function ($paths) {
    // Remove the original path (optional).
    unset($paths[0]);

    // Append the new path and return it.
    $paths[] = get_stylesheet_directory() . '/src/acf';
    return $paths;
});
