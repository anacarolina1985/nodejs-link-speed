(function (angular) {

  var injects = [
   'ngMap',
   'datePicker',
   'ngNotify',
   'angular',
   'ngRoute',
   'ngCookies',

   'auth',
   'common',
   'user',
   'agendamento',
   'visualizacao'
  ];

  angular.module('speedlink', injects);
  angular.module('auth', ['ngNotify', 'ngRoute','ngCookies']);
  angular.module('user', ['ngNotify', 'ngRoute','ngCookies','ngMask', 'angularUtils.directives.dirPagination']);
  angular.module('agendamento', ['ngNotify', 'ngRoute','ngCookies','ngMask']);
  angular.module('visualizacao', ['ngNotify', 'ngRoute','ngCookies', 'angularUtils.directives.dirPagination']);
  angular.module('common', []);

  /*
  Para usar o Perfect Scrollbar, talvez seja  necessário colocar esse arquivo.
  https://github.com/itsdrewmiller/angular-perfect-scrollbar/blob/master/bower_components/perfect-scrollbar/min/perfect-scrollbar.with-mousewheel.min.js

  */
}(angular));
