(function (angular) {

  function CadastroController (
    $scope,
    $http,
    $rootScope,
    $location,
    $window,
    $cookieStore,
    ngNotify
  ) {

    InicializaMenu();

    Inicializar();

    $scope.cadastrar = Cadastrar;

    function Cadastrar(){
      console.log($scope.usuarioForm);
      var user = {
        nome : $scope.usuarioForm.nome.$modelValue,
        email : $scope.usuarioForm.email.$modelValue,
        password : $scope.usuarioForm.senha.$modelValue,
        profile : $scope.usuarioForm.perfil.$modelValue,
        telefone : $scope.usuarioForm.telefone.$modelValue,
        cidade : $scope.usuarioForm.cidade.$modelValue
      }
      console.log(user);
      $http({
        url:'/api/v1/user/cadastrar'
       ,method : 'POST'
       , data : {
         user : user
       }
     }).then(function (result) {
       console.log(result);
       Inicializar();
       return ngNotify.set("Cadastro Realizado com sucesso");
      },function (err) {
        console.log(err);
        return ngNotify.set(err.data.msg);
      })

    }

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

    function Inicializar(){
      console.log("inicializar objetos")
      $scope.nome = "";
      $scope.email = "";
      $scope.senha = "";
      $scope.perfil = "";
      $scope.telefone = "";
      $scope.cidade = "";

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
    }
  }
  angular.module('user').controller('CadastroController',CadastroController);
  }(angular));
