'use strict';
var  db = require('../../database/database');
var Promise = require('es6-promise').Promise;
var model = {};

model.listaPerfis = function(cb){
  var sql = "select * from profile";

  console.log(sql);

  db.handle_database(sql,function(response){
    console.log('Retorno ');
        if(response === null) {
            return cb({code: 500 , msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
        } else {
            if(!response) {
              return cb({code: 401 , msg: 'Não foi possível retornar'});
            } else {
              return cb(null, response);
            }
        }
  });
}

model.cadastrar = function (user, cb){

  var sql = "SELECT count(*) as total FROM auth where email = '" + user.email + "'";
  console.log(sql);

  db.handle_database(sql, insertAuth);

  function insertAuth (result){
    if(result === null){
      return cb({code: 500 , msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
    }else{
      var resultado = result[0].total;
      console.log(resultado);

      if(resultado == 1){
        console.log("erro ------ email já existe");
        return cb({code: 500, msg: 'Email já existe.'});
      }else{
        var sql = "INSERT INTO `auth` (`email`, `password`, `registro`, `profile_id`) VALUES ('" + user.email + "', '" + user.password + "', NOW(), '" + user.profile + "')";
        console.log(sql);
        db.handle_database(sql, insertUser);
      }
    }
  }

  function insertUser(result) {
    console.log(result);
    if(result === null){
      return cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
    }else{
      console.log("Tratando result");
      user.user_id = result.insertId;
      console.log(result.insertId);
      var sql = "INSERT INTO `user` (`nome`, `auth_id`, `telefone`, `cidade`) VALUES ('" + user.nome + "', '" + user.user_id + "', '" +
                user.telefone + "', '" + user.cidade + "')"

      console.log(sql);

      db.handle_database(sql, trataResult);
    }
  }

  function trataResult(result) {
    console.log(result);
    if(result === null){
      return cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'})
    }else{
      console.log(result.insertId);
      console.log("------ Cadastro realizado com sucesso, id do novo usuário : " + result.insertId);
      return cb(null, result.insertId );
    }
  }
}

model.excluirUsuario = function (idUsuario, cb){

  var sqlSelectAuth = "SELECT auth.id FROM auth inner join user on user.auth_id = auth.id where user.id = " + idUsuario;

  console.log(sqlSelectAuth);

  db.handle_database(sqlSelectAuth, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }else{
      var auth_id = result[0].id;

      console.log(auth_id)

      var sqlDeleteUser = "DELETE FROM user where id = " + idUsuario;

      console.log(sqlDeleteUser);

      db.handle_database(sqlDeleteUser, deleteAuth);

      function deleteAuth(result) {
        console.log(result);
        if(result === null){
          cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
          return;
        }
        else{
          var sqlDeleteAuth = "DELETE FROM auth where id = " + auth_id;

          console.log(sqlDeleteAuth);

          db.handle_database(sqlDeleteAuth, trataResult);
        }

        function trataResult(result){
          console.log(result);
          if(result === null){
            cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
            return;
          }
          cb(null, {data: null, msg: "Usuário removido com sucesso!"})
        }
      }
    }
  }
}

model.consultarUsuarios = function (buscaUsuario, cb){
  var sql = "SELECT user.*, auth.email, auth.profile_id, profile.description as profile FROM auth inner join user on user.auth_id = auth.id inner join profile on profile.id = auth.profile_id";

  if(typeof buscaUsuario != 'undefined' && buscaUsuario != "" ){
    sql += " where user.nome like '%" + buscaUsuario + "%'"
  }

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }else{
      cb(null,result)
    }
  }
}

model.CarregaUsuario = function (idUsuario, cb){
  var sql = "SELECT user.*, auth.email, auth.profile_id, profile.description as profile, auth.password "
      sql+= "FROM auth inner join user on user.auth_id = auth.id inner join profile on profile.id = auth.profile_id where user.id = " + idUsuario;

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
    cb(null, {data: result,msg:""})
  }
}

model.atualizarUsuario = function (user, cb){
  var sqlUpdatePerfil = "UPDATE auth set profile_id = " + user.profile_id + " Where auth.id = " + user.auth_id;
  console.log(sqlUpdatePerfil);

  db.handle_database(sqlUpdatePerfil, callback);

  var sqlUpdateUser = "UPDATE user set nome = '" + user.nome + "', telefone = '" + user.telefone + "', cidade = '" + user.cidade + "'  Where id = " + user.id;
  console.log(sqlUpdateUser);

  db.handle_database(sqlUpdateUser, trataRetorno);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
  }

  function trataRetorno(result){
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
    cb(null, {data : result, msg: "Usuario atualizado com sucesso!"});
  }
}

module.exports = model;
