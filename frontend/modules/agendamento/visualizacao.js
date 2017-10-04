(function (angular) {

  function visualizarInstalacaoController (
    $scope,
    $http,
    $rootScope,
    $location,
    $filter,
    $window,
    $cookieStore,
    ngNotify
  ) {

    $scope.instalacoes = [];

    $scope.ConsultarInstalacoes = ConsultarInstalacoes;

    InicializaMenu();

    ConsultarInstalacoes()

    function ConsultarInstalacoes(){
      console.log("buscaCliente : " + $scope.buscaCliente);
      console.log("buscaCliente : " + $scope.buscaData);
      var loggedIn = $cookieStore.get('globals');
      $http({
        url:'/api/v1/visualizacao/consultarInstalacao'
       ,method : 'POST'
       ,data : {
         buscaCliente : $scope.buscaCliente,
         userId : (loggedIn.currentUser.profile == 3 ? loggedIn.currentUser.userId : ""),
         filtrarCancelada : (loggedIn.currentUser.profile == 3 ? true : false),
         filtrarData : $scope.buscaData,
         filtrarHoje : loggedIn.currentUser.profile == 3
       }
     }).then(function (result) {
       $scope.instalacoes = result.data.data
       console.log($scope.instalacoes.length);
       for (var i = 0 ; i < $scope.instalacoes.length; i++){
         console.log($scope.instalacoes[i].data_agendamento);
         $scope.instalacoes[i].data_agendamento = $scope.instalacoes[i].data_agendamento != null ? $filter('date')($scope.instalacoes[i].data_agendamento,'dd/MM/yyyy') : "";
       }
       console.log($scope.instalacoes);
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

    function Excluir(idAgendamento){
      console.log(idAgendamento)
      $http({
        url:'/api/v1/visualizacao/excluirAgendamento'
       ,method : 'POST'
       ,data : {
         idAgendamento : idAgendamento
       }
     }).then(function (result) {
       console.log(result);
       ConsultarInstalacoes()
       return ngNotify.set("Instalacao Excluida com Sucesso");
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.EditarAgendamento = EditarAgendamento;

    function EditarAgendamento (IdAgendamento){
      console.log(IdAgendamento)
      $http({
        url:'/api/v1/visualizacao/CarregaAgendamento'
       ,method : 'POST'
       ,data : {
         idAgendamento : IdAgendamento
       }
     }).then(function (result) {
       if(typeof result.data != 'undefined' && result.data.data.length > 0){
         console.log(result.data.data[0]);
          $scope.agendamentoEdicao = result.data.data[0];

          $scope.agendamentoEdicao.tecnicos = [];
          $http({
            url:'/api/v1/agendamento/listarTecnicos'
           ,method : 'GET'
         }).then(function (result) {
           $scope.agendamentoEdicao.tecnicos = result.data.data;
           //console.log($scope.tecnicos);
          },function (err) {
            console.log(err);
          })

          if(typeof $scope.agendamentoEdicao.data_agendamento == "string"){
            $scope.agendamentoEdicao.data_agendamento = new Date($scope.agendamentoEdicao.data_agendamento);
          }
          if(typeof $scope.agendamentoEdicao.data_vencimento == "string"){
            $scope.agendamentoEdicao.data_vencimento = new Date($scope.agendamentoEdicao.data_vencimento);
          }
          $scope.agendamentoEdicao.tecnico_id = $scope.agendamentoEdicao.tecnico_id.toString();

          $scope.agendamentoEdicao.periodo = $scope.agendamentoEdicao.periodo.toString();

          $scope.agendamentoEdicao.statusagendamento = $scope.agendamentoEdicao.statusagendamento.toString();
       }
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.SalvarEdicaoAgendamento = SalvarEdicaoAgendamento;

    function SalvarEdicaoAgendamento(){
      console.log($scope.agendamentoEdicao);
      $http({
        url:'/api/v1/visualizacao/atualizarAgendamento'
       ,method : 'POST'
       ,data : {
         agendamento : $scope.agendamentoEdicao
       }
     }).then(function (result) {
        console.log(result);
        ConsultarInstalacoes();
        return ngNotify.set(result.data.msg);
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }
  }


  function visualizarControleInstalacaoController (
    $scope,
    $http,
    $rootScope,
    $location,
    $filter,
    $window,
    $cookieStore,
    ngNotify
  ) {

    $scope.instalacoes = [];

    $scope.ConsultarInstalacoes = ConsultarInstalacoes;

    InicializaMenu();

    ConsultarInstalacoes()

    function ConsultarInstalacoes(){
      console.log("buscaCliente : " + $scope.buscaCliente);
      console.log("buscaCliente : " + $scope.buscaData);
      var loggedIn = $cookieStore.get('globals');
      $http({
        url:'/api/v1/visualizacao/consultarInstalacao'
       ,method : 'POST'
       ,data : {
         buscaCliente : $scope.buscaCliente,
         userId : (loggedIn.currentUser.profile == 3 ? loggedIn.currentUser.userId : ""),
         filtrarCancelada : (loggedIn.currentUser.profile == 3 ? true : false),
         filtrarData : $scope.buscaData,
         filtrarHoje : (typeof $scope.buscaData == 'undefined' || $scope.buscaData == '' || $scope.buscaData == null)
       }
     }).then(function (result) {
       $scope.instalacoes = result.data.data
       console.log($scope.instalacoes.length);
       for (var i = 0 ; i < $scope.instalacoes.length; i++){
         console.log($scope.instalacoes[i].data_agendamento);
         $scope.instalacoes[i].data_agendamento = $scope.instalacoes[i].data_agendamento != null ? $filter('date')($scope.instalacoes[i].data_agendamento,'dd/MM/yyyy') : "";
       }
       console.log($scope.instalacoes);
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

    function Excluir(idAgendamento){
      console.log(idAgendamento)
      $http({
        url:'/api/v1/visualizacao/excluirAgendamento'
       ,method : 'POST'
       ,data : {
         idAgendamento : idAgendamento
       }
     }).then(function (result) {
       console.log(result);
       ConsultarInstalacoes()
       return ngNotify.set("Instalacao Excluida com Sucesso");
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.EditarAgendamento = EditarAgendamento;

    function EditarAgendamento (IdAgendamento){
      console.log(IdAgendamento)
      $http({
        url:'/api/v1/visualizacao/CarregaAgendamento'
       ,method : 'POST'
       ,data : {
         idAgendamento : IdAgendamento
       }
     }).then(function (result) {
       if(typeof result.data != 'undefined' && result.data.data.length > 0){
         console.log(result.data.data[0]);
          $scope.agendamentoEdicao = result.data.data[0];

          $scope.agendamentoEdicao.tecnicos = [];
          $http({
            url:'/api/v1/agendamento/listarTecnicos'
           ,method : 'GET'
         }).then(function (result) {
           $scope.agendamentoEdicao.tecnicos = result.data.data;
           //console.log($scope.tecnicos);
          },function (err) {
            console.log(err);
          })

          if(typeof $scope.agendamentoEdicao.data_agendamento == "string"){
            $scope.agendamentoEdicao.data_agendamento = new Date($scope.agendamentoEdicao.data_agendamento);
          }
          if(typeof $scope.agendamentoEdicao.data_vencimento == "string"){
            $scope.agendamentoEdicao.data_vencimento = new Date($scope.agendamentoEdicao.data_vencimento);
          }
          $scope.agendamentoEdicao.tecnico_id = $scope.agendamentoEdicao.tecnico_id.toString();

          $scope.agendamentoEdicao.periodo = $scope.agendamentoEdicao.periodo.toString();

          $scope.agendamentoEdicao.statusagendamento = $scope.agendamentoEdicao.statusagendamento.toString();
       }
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.SalvarEdicaoAgendamento = SalvarEdicaoAgendamento;

    function SalvarEdicaoAgendamento(){
      console.log($scope.agendamentoEdicao);
      $http({
        url:'/api/v1/visualizacao/atualizarAgendamento'
       ,method : 'POST'
       ,data : {
         agendamento : $scope.agendamentoEdicao
       }
     }).then(function (result) {
        console.log(result);
        ConsultarInstalacoes();
        return ngNotify.set(result.data.msg);
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }
  }

  function visualizarManutencaoController (
    $scope,
    $http,
    $rootScope,
    $location,
    $filter,
    $window,
    $cookieStore,
    ngNotify
  ) {

    $scope.manutencoes = [];

    $scope.ConsultarManutencoes = ConsultarManutencoes;

    InicializaMenu();

    ConsultarManutencoes()

    function ConsultarManutencoes(){
      console.log("buscaCliente : " + $scope.buscaCliente);
      var loggedIn = $cookieStore.get('globals');
      var userId = loggedIn.currentUser.profile == 3 ? loggedIn.currentUser.userId : "";
      var filtrarCancelada = loggedIn.currentUser.profile == 3 ? true : false
      $http({
        url:'/api/v1/visualizacao/consultarManutencoes'
       ,method : 'POST'
       ,data : {
         buscaCliente : $scope.buscaCliente,
         userId : userId,
         filtrarCancelada : filtrarCancelada,
         filtrarHoje : loggedIn.currentUser.profile == 3

       }
     }).then(function (result) {
       $scope.manutencoes = result.data.data;
       console.log($scope.manutencoes.length);
       for (var i = 0 ; i < $scope.manutencoes.length; i++){
         console.log($scope.manutencoes[i].data_agendamento);
         $scope.manutencoes[i].data_agendamento = $scope.manutencoes[i].data_agendamento != null ? $filter('date')($scope.manutencoes[i].data_agendamento,'dd/MM/yyyy') : "";
       }
       console.log($scope.manutencoes);
      },function (err) {
        console.log(err);
        return ngNotify.set(err.data.msg);
      })
    }

    function InicializaMenu(loggedIn){
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

    function Excluir(idAgendamento){
      console.log(idAgendamento)
      $http({
        url:'/api/v1/visualizacao/excluirAgendamento'
       ,method : 'POST'
       ,data : {
         idAgendamento : idAgendamento
       }
     }).then(function (result) {
       console.log(result);
       ConsultarManutencoes()
       return ngNotify.set("Instalacao Excluida com Sucesso");
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.EditarAgendamento = EditarAgendamento;

    function EditarAgendamento (IdAgendamento){
      console.log(IdAgendamento)
      $http({
        url:'/api/v1/visualizacao/CarregaAgendamento'
       ,method : 'POST'
       ,data : {
         idAgendamento : IdAgendamento
       }
     }).then(function (result) {
       if(typeof result.data != 'undefined' && result.data.data.length > 0){
         console.log(result.data.data[0]);
          $scope.agendamentoEdicao = result.data.data[0];

          $scope.agendamentoEdicao.tecnicos = [];
          $http({
            url:'/api/v1/agendamento/listarTecnicos'
           ,method : 'GET'
         }).then(function (result) {
           $scope.agendamentoEdicao.tecnicos = result.data.data;
           //console.log($scope.tecnicos);
          },function (err) {
            console.log(err);
          })

          if(typeof $scope.agendamentoEdicao.data_agendamento == "string"){
            $scope.agendamentoEdicao.data_agendamento = new Date($scope.agendamentoEdicao.data_agendamento);
          }
          if(typeof $scope.agendamentoEdicao.data_vencimento == "string"){
            $scope.agendamentoEdicao.data_vencimento = new Date($scope.agendamentoEdicao.data_vencimento);
          }
          $scope.agendamentoEdicao.tecnico_id = $scope.agendamentoEdicao.tecnico_id.toString();

          $scope.agendamentoEdicao.statusagendamento = $scope.agendamentoEdicao.statusagendamento.toString();
       }
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }

    $scope.SalvarEdicaoAgendamento = SalvarEdicaoAgendamento;

    function SalvarEdicaoAgendamento(){
      console.log($scope.agendamentoEdicao);
      $http({
        url:'/api/v1/visualizacao/atualizarAgendamento'
       ,method : 'POST'
       ,data : {
         agendamento : $scope.agendamentoEdicao
       }
     }).then(function (result) {
        console.log(result);
        ConsultarManutencoes();
        return ngNotify.set(result.data.msg);
      },function (err) {
        return ngNotify.set(err.data.msg);
        console.log(err);
      })
    }
  }

  angular.module('visualizacao').controller('visualizarManutencaoController',visualizarManutencaoController);
  angular.module('visualizacao').controller('visualizarInstalacaoController',visualizarInstalacaoController);
  angular.module('visualizacao').controller('visualizarControleInstalacaoController',visualizarControleInstalacaoController);

}(angular));
