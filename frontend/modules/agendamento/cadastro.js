(function (angular) {

  function agendarInstalacaoController (
    $scope,
    $http,
    $rootScope,
    $location,
    $filter,
    $window,
    $cookieStore,
    ngNotify
  ) {

    $scope.tecnicos = [];

    IniciaAgendamento();

    InicializaMenu();

    $http({
      url:'/api/v1/agendamento/listarTecnicos'
     ,method : 'GET'
   }).then(function (result) {
     $scope.tecnicos = result.data.data
     //console.log($scope.tecnicos);
    },function (err) {
      console.log(err);
    })

    $scope.cancelar = Cancelar;
    $scope.agendar = Cadastrar;

    $scope.atualizaEndereco = AtualizarEndereco;

    function AtualizarEndereco(){
      console.log($scope.agendamento.endereco.cep);
      $http({
        url:'http://api.postmon.com.br/v1/cep/'+$scope.agendamento.endereco.cep
       ,method : 'GET'
     }).then(function (result) {
       var resultadoPost = result.data;
       $scope.agendamento.endereco = {};
       $scope.agendamento.endereco.bairro = resultadoPost.bairro;
       $scope.agendamento.endereco.cep = resultadoPost.cep;
       $scope.agendamento.endereco.cidade = resultadoPost.cidade;
       $scope.agendamento.endereco.complemento = "";
       $scope.agendamento.endereco.estado = resultadoPost.estado;
       $scope.agendamento.endereco.numero = "";
       $scope.agendamento.endereco.rua = resultadoPost.logradouro;
      },function (err) {
        console.log(err);
        return ngNotify.set(err.data.msg);
      })

    }

    function Cancelar (){
      console.log('cancelar');
      var form = $scope.agendamento;
      IniciaAgendamento();
    }


    function Cadastrar(){
      console.log('cadastrar');

      $http({
        url:'/api/v1/agendamento/agendarInstalacao'
       ,method : 'POST'
       ,data : {
         agendamento : $scope.agendamento
       }
     }).then(function (result) {
       console.log(result);
       IniciaAgendamento();
       return ngNotify.set("Cadastro Realizado com sucesso");
      },function (err) {
        console.log(err);
        return ngNotify.set(err.data.msg);
      })
    }

    function IniciaAgendamento(){
      $scope.agendamento = {}
      $scope.agendamento.dataAgendamento = "";
      $scope.agendamento.dataVencimento = "";
      $scope.agendamento.descricao = "";
      $scope.agendamento.cpf = "";
      $scope.agendamento.endereco = {};
      $scope.agendamento.endereco.bairro = "";
      $scope.agendamento.endereco.cep = "";
      $scope.agendamento.endereco.cidade = "";
      $scope.agendamento.endereco.complemento = "";
      $scope.agendamento.endereco.estado = "";
      $scope.agendamento.endereco.numero = "";
      $scope.agendamento.endereco.rua = "";
      $scope.agendamento.horario = "";
      $scope.agendamento.periodo = "";
      $scope.agendamento.plano = "";
      $scope.agendamento.tecnicoAgendamento = "";
      $scope.agendamento.telefone = "";
      $scope.agendamento.senha = "";
      $scope.agendamento.usuario = "";
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
        $scope.profilePermission = loggedIn.currentUser.profile;
        $scope.agendamento.userId = loggedIn.currentUser.userId;
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

  function agendarManutencaoController (
    $scope,
    $http,
    $rootScope,
    $location,
    $filter,
    $window,
    $cookieStore,
    ngNotify
  ) {

    $scope.tecnicos = [];

    IniciaAgendamento();

    InicializaMenu();

    $http({
      url:'/api/v1/agendamento/listarTecnicos'
     ,method : 'GET'
   }).then(function (result) {
     $scope.tecnicos = result.data.data
     //console.log($scope.tecnicos);
    },function (err) {
      console.log(err);
    })

    $scope.cancelar = Cancelar;
    $scope.agendar = Cadastrar;

    $scope.atualizaEndereco = AtualizarEndereco;

    function AtualizarEndereco(){
      console.log($scope.agendamento.endereco.cep);
      $http({
        url:'http://api.postmon.com.br/v1/cep/'+$scope.agendamento.endereco.cep
       ,method : 'GET'
     }).then(function (result) {
       var resultadoPost = result.data;
       $scope.agendamento.endereco = {};
       $scope.agendamento.endereco.bairro = resultadoPost.bairro;
       $scope.agendamento.endereco.cep = resultadoPost.cep;
       $scope.agendamento.endereco.cidade = resultadoPost.cidade;
       $scope.agendamento.endereco.complemento = "";
       $scope.agendamento.endereco.estado = resultadoPost.estado;
       $scope.agendamento.endereco.numero = "";
       $scope.agendamento.endereco.rua = resultadoPost.logradouro;
      },function (err) {
        console.log(err);
        return ngNotify.set(err.data.msg);
      })

    }

    function Cancelar (){
      console.log('cancelar');
      var form = $scope.agendamento;
      IniciaAgendamento();
    }


    function Cadastrar(){
      console.log('cadastrar Manutenção');
      console.log($scope.agendamento);

      $http({
        url:'/api/v1/agendamento/agendarManutencao'
       ,method : 'POST'
       ,data : {
         agendamento : $scope.agendamento
       }
     }).then(function (result) {
       console.log(result);
       IniciaAgendamento();
       return ngNotify.set("Cadastro Realizado com sucesso");
      },function (err) {
        console.log(err);
        return ngNotify.set(err.data.msg);
      })
    }

    function IniciaAgendamento(){
      $scope.agendamento = {}
      $scope.agendamento.dataAgendamento = "";
      $scope.agendamento.dataVencimento = "";
      $scope.agendamento.descricao = "";
      $scope.agendamento.cpf = "";
      $scope.agendamento.endereco = {};
      $scope.agendamento.endereco.bairro = "";
      $scope.agendamento.endereco.cep = "";
      $scope.agendamento.endereco.cidade = "";
      $scope.agendamento.endereco.complemento = "";
      $scope.agendamento.endereco.estado = "";
      $scope.agendamento.endereco.numero = "";
      $scope.agendamento.endereco.rua = "";
      $scope.agendamento.horario = "";
      $scope.agendamento.periodo = "";
      $scope.agendamento.plano = "";
      $scope.agendamento.tecnicoAgendamento = "";
      $scope.agendamento.telefone = "";
      $scope.agendamento.userId = "";
      $scope.agendamento.senha = "";
      $scope.agendamento.usuario = "";
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
        $scope.profilePermission = loggedIn.currentUser.profile;
        $scope.agendamento.userId = loggedIn.currentUser.userId;
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

  angular.module('agendamento').controller('agendarManutencaoController',agendarManutencaoController);
  angular.module('agendamento').controller('agendarInstalacaoController',agendarInstalacaoController);
}(angular));
