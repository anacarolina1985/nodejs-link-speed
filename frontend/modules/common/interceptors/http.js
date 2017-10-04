(function (angular) {
  'use strict';
  angular.module('common').factory('NetworkInterceptor',function ($q,db,$injector,cfpLoadingBar) {
    var obj = {};

   obj.request =  function(config) {
      var user = db.getObject('User');
      console.log(user.token);      

      if(config.url.indexOf('map') > 0){
        return config;
      }

      if(config.url.indexOf('postmon') > 0){
        return config;
      }

      if(user){
        config.headers['token-user'] = user.token;
      }

      return config;

    };

    return obj;
  });
})(angular);
