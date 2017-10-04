'use strict';
var  db = require('../../database/database');
var Promise = require('es6-promise').Promise;
var model = {};

model.listarTecnicos = function(cb){
  var sql = "select u.* from user u inner join auth a on u.auth_id = a.id where a.profile_id = 3";

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

model.agendar = function(tipoAgendamento, agendamento, cb){

  console.log("agendar MODEL");

  model.cadastrarEndereco(tipoAgendamento, agendamento, cb);

}

model.cadastrarEndereco = function(tipoAgendamento, agendamento, cb){
  var sql  = "INSERT INTO.`endereco` (`logradouro`, `cep`, `numero`, `bairro`, `cidade`, `estado`, `complemento`) ";
      sql += "VALUES ('" + agendamento.endereco.rua + "', '" + agendamento.endereco.cep + "', '" + agendamento.endereco.numero + "', '" + agendamento.endereco.bairro   + "'";
      sql += ", '" + agendamento.endereco.cidade + "', '" + agendamento.endereco.estado + "', '" + (agendamento.endereco.complemento ? agendamento.endereco.complemento : "") + "')";


  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    if(result === null){
        cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
        return;
    }
    console.log(result);
    console.log(result.insertId);
    if(result.insertId <= 0){
      cb({code: 500,msg: 'Enderco não cadastrado'});
      return;
    }
    agendamento.enderecoId = result.insertId;
    model.cadastrarAgendamento(tipoAgendamento, agendamento, cb);
  }
}

model.cadastrarAgendamento = function (tipoAgendamento, agendamento, cb){
  console.log("registrar agendamento : " + agendamento.dataAgendamento);
  //console.log("instanceof agendamento.dataAgendamento instanceof Date : " + agendamento.dataAgendamento instanceof Date);
  //console.log(typeof agendamento.dataAgendamento)
  var sql = "INSERT INTO `agendamento` (`data_agendamento`, `data_vencimento`, `hora_agendamento`, `tecnico_id`, `user_id`, `endereco_id`, `tipo_agendamento`, `periodo`, `cliente`, `statusagendamento`, `cpf`, "
      sql+= "`plano`, `descricao`, `telefone`, `usuario`, `senha`) ";
      sql+= "VALUES (" + (agendamento.dataAgendamento == "" ? null : "'" + agendamento.dataAgendamento + "'") + ", " + (agendamento.dataVencimento == "" ? null : "'" + agendamento.dataVencimento + "'")
      sql+= ", '" + agendamento.horario + "', '" + agendamento.tecnicoAgendamento + "', '" + agendamento.userId + "', '";
      sql+= agendamento.enderecoId +"', '" + tipoAgendamento + "', " + (agendamento.periodo != "" ? agendamento.periodo : null) + ", '" + agendamento.cliente + "', 1,  ";
      sql+= (agendamento.cpf != "" ? "'" + agendamento.cpf + "'" : null) + ", " + (agendamento.plano != "" ? "'" + agendamento.plano + "'" : null)  + ", '" + agendamento.descricao + "', '";
      sql+=  agendamento.telefone + "', '" + agendamento.usuario + "', '" + agendamento.senha +"')";

      console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }else{

    }
    console.log(result);
    return cb(null, result);

  }
}

module.exports = model;
