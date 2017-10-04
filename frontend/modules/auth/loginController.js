(function (angular) {

  function AuthController (
    $scope,
    $http,
    $rootScope,
    $location,
    $window,
    $cookieStore,
    ngNotify
  ) {
    $scope.login = Login;
    $scope.recoveryPassword = RecoveryPassword;

    $scope.perfis = [];

    $http({
      url:'/api/v1/user/listarPerfis'
     ,method : 'GET'
   }).then(function (result) {
     $scope.perfis = result.data.data
     console.log($scope.perfis);
    },function (err) {
      console.log(err);
    })

    function Login(){
      //console.log(form.email);
      console.log($scope.email);
      //console.log(form.password);
      console.log($scope.password);
      //console.log(form.profile);
      console.log($scope.profile);

      $http({
        url:'/api/v1/auth/login'
      , method : 'POST'
      , data : {
        email : $scope.email,
        password : $scope.password,
        profile : $scope.profile
      }
      }).then(function (result) {
        console.log("sucess : ");
        console.log(result.data);
        if(!result.data.success){
          return ngNotify.set("Login Inválido");
        }else{
          if(result.data.data != false){
            var user = {
              userId : result.data.data[0].userId,
              email : $scope.email,
              profile : $scope.profile
            };
            SetCredentials(user);
            console.log(user);
            $window.location.href = "/index.html";
          }else{
            return ngNotify.set("Login inválido");
          }
        }
      },function (err) {
        console.log("Failed : " + err);
        Fail(err);
      })
    }

    function RecoveryPassword(){
      console.log("RecoveryPassword");
      console.log($scope.emailRecovery);
      $http({
        url:'/api/v1/auth/recoveryPassword'
       ,method : 'POST'
       ,data : {
         emailRecovery : $scope.emailRecovery
       }
     }).then(function (result) {
       return ngNotify.set("Email enviado com nova senha");

      },function (err) {
        console.log(err);
        Fail(err);
      })
    }

    function Fail (err) {
      return ngNotify.set(err.data.msg);
    }

    function SetCredentials(user) {
        var authdata = user.email + ':' + user.userId;

        $rootScope.globals = {
            currentUser: {
                userId : user.userId,
                username: user.email,
                profile : user.profile,
                authdata: authdata
            }
        };

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
        $cookieStore.put('globals', $rootScope.globals);
    }

  }

  function menuLogin(
    $scope,
    $http,
    $rootScope,
    $location,
    $window,
    $q,
    $cookieStore,
    ngNotify
    ){

    InicializaMenu();

    function InicializaMenu(){
      var loggedIn = $cookieStore.get('globals');

      console.log(loggedIn);

      if(typeof loggedIn == "undefined"){
        console.log("não logado");
        $scope.profilePermission = 0;
        $scope.exibeMenu = false;
        $scope.logged = false;
        $window.location.href = "/login.html";
      }else {
        console.log("logado")
        $scope.profilePermission = loggedIn.currentUser.profile
        $scope.exibeMenu = true;
        $scope.logged = true;

      }

      $scope.logout = Logout;

      function Logout(){

        ClearCredentials();
        $window.location.href = "/login.html";
      }


      function ClearCredentials() {
          $rootScope.globals = {};
          $cookieStore.remove('globals');
          $http.defaults.headers.common.Authorization = 'Basic';
      }
    }
  }

  angular.module('auth').controller('menuLogin',menuLogin);
  angular.module('auth').controller('AuthController',AuthController);
}(angular));
