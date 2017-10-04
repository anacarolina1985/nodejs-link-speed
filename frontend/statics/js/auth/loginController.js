!function(angular){function AuthController($scope,$http,$rootScope,$location,$window,$cookieStore,ngNotify){function Login(){console.log($scope.email),console.log($scope.password),console.log($scope.profile),$http({url:"/api/v1/auth/login",method:"POST",data:{email:$scope.email,password:$scope.password,profile:$scope.profile}}).then(function(result){if(console.log("sucess : "),console.log(result.data),!result.data.success)return ngNotify.set("Login Inválido");if(0==result.data.data)return ngNotify.set("Login inválido");var user={userId:result.data.data[0].userId,email:$scope.email,profile:$scope.profile};SetCredentials(user),console.log(user),$window.location.href="/index.html"},function(err){console.log("Failed : "+err),Fail(err)})}function RecoveryPassword(){console.log("RecoveryPassword"),console.log($scope.emailRecovery),$http({url:"/api/v1/auth/recoveryPassword",method:"POST",data:{emailRecovery:$scope.emailRecovery}}).then(function(result){return ngNotify.set("Email enviado com nova senha")},function(err){console.log(err),Fail(err)})}function Fail(err){return ngNotify.set(err.data.msg)}function SetCredentials(user){var authdata=user.email+":"+user.userId;$rootScope.globals={currentUser:{userId:user.userId,username:user.email,profile:user.profile,authdata:authdata}},$http.defaults.headers.common.Authorization="Basic "+authdata,$cookieStore.put("globals",$rootScope.globals)}$scope.login=Login,$scope.recoveryPassword=RecoveryPassword,$scope.perfis=[],$http({url:"/api/v1/user/listarPerfis",method:"GET"}).then(function(result){$scope.perfis=result.data.data,console.log($scope.perfis)},function(err){console.log(err)})}function menuLogin($scope,$http,$rootScope,$location,$window,$q,$cookieStore,ngNotify){function InicializaMenu(){function Logout(){ClearCredentials(),$window.location.href="/login.html"}function ClearCredentials(){$rootScope.globals={},$cookieStore.remove("globals"),$http.defaults.headers.common.Authorization="Basic"}var loggedIn=$cookieStore.get("globals");console.log(loggedIn),"undefined"==typeof loggedIn?(console.log("não logado"),$scope.profilePermission=0,$scope.exibeMenu=!1,$scope.logged=!1,$window.location.href="/login.html"):(console.log("logado"),$scope.profilePermission=loggedIn.currentUser.profile,$scope.exibeMenu=!0,$scope.logged=!0),$scope.logout=Logout}InicializaMenu()}angular.module("auth").controller("menuLogin",menuLogin),angular.module("auth").controller("AuthController",AuthController)}(angular);