<?php
     
     namespace Win\Iphone\Controller;

     class HomeController{
          
           public function index():void{
             
               require dirname(__DIR__, 2) .'/src/Views/home.php';
              
           }
     }