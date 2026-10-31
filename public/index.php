<?php
declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Win\Iphone\Core\Route;
use Win\Iphone\Controller\HomeController;


$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';


$basePath = '/WIN_AN_IPHONE';


$basePath = '/' . trim($basePath, '/');
if ($basePath === '//') {
    $basePath = '/';
}


define('BASE_URL', $scheme . '://' . $host . $basePath);   
define('ASSETS',   rtrim(BASE_URL, '/') . '/public/assets/');     


$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';

// Retire le préfixe /WIN_AN_IPHONE
if ($basePath !== '/' && str_starts_with($path, $basePath)) {
    $path = substr($path, strlen($basePath));
}

if ($path === '' || $path === false) {
    $path = '/';
}


if (!str_starts_with($path, '/')) {
    $path = '/' . $path;
}


$router = new Route();

$router->add('/', function () {
    $HomeDisplay = new HomeController();
    $HomeDisplay->index();
});

$router->dispatch($path);