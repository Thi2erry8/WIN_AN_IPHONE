<?php
      declare(strict_types=1);
      
      require __DIR__ . '/../vendor/autoload.php';

      USE Win\Iphone\Core\Route;
      USE Win\Iphone\Controller\HomeController;
       
      $path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

     // Retire le préfixe /WIN_AN_IPHONE (utile en dev sous XAMPP)
     $basePath = '/WIN_AN_IPHONE';
     if (str_starts_with($path, $basePath)) {
        $path = substr($path, strlen($basePath));
     }

     if ($path === '' || $path === false) {
        $path = '/';
     }

      $router = new Route;

      $router->add("/", function(){
          $HomeDisplay = New HomeController;
          $HomeDisplay->index();
          
      });

      $router->dispatch($path);