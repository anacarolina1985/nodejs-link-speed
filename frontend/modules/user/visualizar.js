(function (angular) {

  function visualizarUsuarioController (
    $scope,
    $http,
    $rootScope,
    $location,
    $filter,
    $window,
    $cookieStore,
    ngNotify
  ) {

    $scope.usuarios = [];

    $scope.usuarioEdicao = {};

    InicializarUsuarioEdicao();

    $scope.ConsultarUsuarios = ConsultarUsuarios;

    InicializaMenu();

    ConsultarUsuarios()

    function ConsultarUsuarios(){
      console.log("buscaUsuario : " + $scope.buscaUsuario);
      var loggedIn = $cookieStore.get('globals');
      $http({
        url:'/api/v1/user/consultarUsuarios'
       ,method : 'POST'
       ,data : {
         buscaUsuario : $scope.buscaUsuario
       }
     }).then(function (result) {
       $scope.usuarios = result.data.data
       console.log($scope.usuarios.length);
       console.log($scope.usuarios);
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

    $scope.Excluir = Excluir;

    function Excluir(idUsuario){
      console.log(idUsuario)
      $http({
        url:'/api/v1/user/excluirUsuario'
       ,method : 'POST'
       ,data : {
         idUsuario : idUsuario
       }
     }).then(function (result) {
       console.log(result);
       ConsultarUsuarios()
       return ngNotify.set("Usuario Excluido com Sucesso");
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.Editar = Editar;

    function Editar(idUsuario){
      InicializarUsuarioEdicao();
      console.log(idUsuario)
      $http({
        url:'/api/v1/user/CarregaUsuario'
       ,method : 'POST'
       ,data : {
         idUsuario : idUsuario
       }
     }).then(function (result) {
       if(typeof result.data != 'undefined' && result.data.data.length > 0){
         console.log(result.data.data[0]);
          $scope.usuarioEdicao = result.data.data[0];
          $scope.usuarioEdicao.perfis = [];

          $scope.usuarioEdicao.profile_id = $scope.usuarioEdicao.profile_id.toString(); 

          $http({
            url:'/api/v1/user/listarPerfis'
           ,method : 'GET'
         }).then(function (result) {
           $scope.usuarioEdicao.perfis = result.data.data
           console.log($scope.usuarioEdicao.perfis);
          },function (err) {
            console.log(err);
          })
       }

      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    function InicializarUsuarioEdicao(){
      console.log("inicializar objetos")
      $scope.usuarioEdicao.id = "";
      $scope.usuarioEdicao.nome = "";
      $scope.usuarioEdicao.email = "";
      $scope.usuarioEdicao.perfil = "";
      $scope.usuarioEdicao.telefone = "";
      $scope.usuarioEdicao.cidade = "";

      $scope.usuarioEdicao.perfis = [];

      $http({
        url:'/api/v1/user/listarPerfis'
       ,method : 'GET'
     }).then(function (result) {
       $scope.usuarioEdicao.perfis = result.data.data
       console.log($scope.usuarioEdicao.perfis);
      },function (err) {
        console.log(err);
      })
    }

    $scope.salvarEdicaoUsuario = salvarEdicaoUsuario;

    function salvarEdicaoUsuario(){
      console.log($scope.usuarioEdicao);
      $http({
        url:'/api/v1/user/atualizarUsuario'
       ,method : 'POST'
       ,data : {
         user : $scope.usuarioEdicao
       }
     }).then(function (result) {
        console.log(result);
        ConsultarUsuarios();
        return ngNotify.set(result.data.msg);
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })

    }
  }

  angular.module('user').controller('visualizarUsuarioController',visualizarUsuarioController);
}(angular));
