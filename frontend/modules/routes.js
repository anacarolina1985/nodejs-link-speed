(function (angular) {

  angular.module('speedlink')
    .config(function(
      $routeProvider,
      $locationProvider
    ){
        $routeProvider
          .when('/dashboard', {
              controller: 'menuLogin',
              templateUrl: 'index.html',
              controllerAs: 'vm'
          })

          .when('/', {
              controller: 'AuthController',
              templateUrl: 'login.html',
              controllerAs: 'vm'
          })

          .otherwise({ redirectTo: '/' });
      });
}(angular));
