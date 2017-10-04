(function (angular) {


  angular.module('speedlink').run(init).config(config)


        function init (db,$rootScope,ngNotify,$state) {

          /*
          Configuração padrão para as notificações.
          */
          var ngNotifyConfig = {theme: 'pitchy',position: 'top',duration: 5000,type: 'error',sticky: false,button: true,html: true };
          ngNotify.config(ngNotifyConfig);

          // keep user logged in after page refresh
          $rootScope.globals = $cookieStore.get('globals') || {};
          if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
          }

          $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
          });
        }

        function config(tooltipsConfProvider,$httpProvider) {
          $httpProvider.defaults.useXDomain = true;
          tooltipsConfProvider.configure({
            'smart':true,
            'size':'small',
            'speed': 'slow',
            'class' : 'grid-5'
          });
        }
}(angular));
