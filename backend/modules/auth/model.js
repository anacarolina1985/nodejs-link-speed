'use strict';
var  db = require('../../database/database');
var Promise = require('es6-promise').Promise;
var model = {};

model.login = function(email, password, profile, cb){
  var sql = "select user.id as userId from auth inner join user on user.auth_id = auth.id where email = '" + email + "' "
      sql+= "and password ='" + password + "' and profile_id = " + profile;

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      return cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
    }
    if(result.length > 0 && result[0].userId <= 0){
      console.log(result[0]);
      console.log(result[0].userId);
      return cb({code: 404, msg: 'Usuário e/ou Senha não conferem, tente novamente!'});
    }
    return cb(null,result);
  }
}

model.updatePassword = function(email, password, passwordGerado, cb){
  var sql = "select count(*) as authentication from auth where email = '" + email + "' ";

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    if(result === null){
      return cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
    }
    console.log(result[0]);
    console.log(result[0].authentication);
    if(result[0].authentication > 1){
      return cb({code: 500,msg: 'Houve um problema ao tentar acessar sua conta, entre em contato com o suporte por favor.'});
    }
    if(result[0].authentication == 0){
      return cb({code: 404, msg: 'Usuário e/ou Senha não conferem, tente novamente!'});
    }

    var update = "UPDATE auth set password = '" + password + "' where email = '" + email + "' ";

    console.log(update);

    db.handle_database(update, TrataAtualizacao);

    function TrataAtualizacao(result){
      if(result === null){
        return cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      }
      console.log(result);
      if (result.changedRows < 1){
        return cb({code: 500,msg: 'Senha não Gerada com sucesso'});
      }

      return cb(null, passwordGerado);
    }
  }
}


module.exports = model;
