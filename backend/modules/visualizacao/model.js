'use strict';
var  db = require('../../database/database');
var Promise = require('es6-promise').Promise;
var model = {};

model.consultarAgendamento = function(tipoAgendamento, buscaCliente,userId,filtrarCancelada, filtrarData, filtrarHoje, cb){
  var sql = "SELECT a.id, a.cliente, e.logradouro, e.numero, e.bairro, a.usuario, LEFT(a.senha, 3) as senha, t.nome as tecnico ";
        sql+= ",st.descricao as status, st.id as status_ag_id, st.editavel, a.data_agendamento, a.hora_agendamento ";
        sql+= "FROM agendamento a ";
        sql+= "left join endereco e on a.endereco_id = e.id ";
        sql+= "left join user t on a.tecnico_id = t.id ";
        sql+= "left join statusagendamento st on a.statusagendamento = st.id ";
        sql+= "where a.tipo_agendamento =  " + tipoAgendamento;

    if (typeof buscaCliente != 'undefined' && buscaCliente != ""){
      sql+= " and a.cliente like '%" + buscaCliente + "%' ";
    }

    if (typeof userId != 'undefined' && userId != "")
    {
      sql+= " and a.tecnico_id =" + userId ;
    }

    if (typeof filtrarCancelada != 'undefined' && filtrarCancelada)
    {
      sql+= " and a.statusagendamento not in (5)";
    }

    if (typeof filtrarData != 'undefined' && filtrarData != "")
    {
      var dataFiltrar = "";
      if(typeof filtrarData == "string" ){
        //console.log("data agendamento é string");
        dataFiltrar = new Date (filtrarData);
        //console.log(dataFiltrar.getFullYear() + "-" + (dataFiltrar.getMonth() + 1) + '-' + dataFiltrar.getUTCDate());
      }
      if(dataFiltrar != ""){

        sql+= " and a.data_agendamento = '" + (dataFiltrar.getFullYear() + "-" + (dataFiltrar.getMonth() + 1) + '-' + dataFiltrar.getUTCDate()) + "' " ;
      }

    }

    if(typeof filtrarHoje != 'undefined' && filtrarHoje){
      sql+= " and a.data_agendamento = CURDATE() " ;
    }

    sql+= " order by a.data_agendamento, a.hora_agendamento"

  //var sql = "select * from agendamento";

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
    cb(null,result)
  }
}

model.excluirAgendamento = function (idAgendamento, cb){
  var sqlSelectEndereco = "SELECT endereco_id FROM agendamento where id = " + idAgendamento;

  console.log(sqlSelectEndereco);

  db.handle_database(sqlSelectEndereco, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
    var endereco_id = result[0].endereco_id;

    var sql = "DELETE FROM agendamento where id = " + idAgendamento;

    console.log(sql);

    db.handle_database(sql, removeEndereco);

    function removeEndereco(result){
      console.log(result);
      if(result === null){
        cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
        return;
      }
      var sqldeleteEnd = "DELETE FROM endereco where id = " + endereco_id;

      console.log(sqldeleteEnd);

      db.handle_database(sqldeleteEnd, trataResult);

      function trataResult(result) {
        console.log(result);

        if(result === null){
          cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
          return;
        }else{

          cb(null, {data: null, msg: "Agendamento Excluido com sucesso!"});
        }
      }

    }

  }

}

model.CarregaAgendamento = function (idAgendamento, cb){
  var sql = "SELECT a.*, e.logradouro, e.cep, e.numero, e.complemento, e.bairro, e.cidade, e.estado FROM agendamento a inner join endereco e on e.id = a.endereco_id where a.id = " + idAgendamento;

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
    cb(null,{data: result, msg : null})
  }

}

model.atualizarAgendamento = function (agendamento, cb){
  var sql = "UPDATE endereco set cep='" + agendamento.cep + "', logradouro = '" + agendamento.logradouro + "', numero='" + agendamento.numero + "', complemento = '" + agendamento.complemento + "', ";
      sql+= "bairro = '" + agendamento.bairro + "', cidade='" + agendamento.cidade + "', estado ='" + agendamento.estado + "' where id = " + agendamento.endereco_id;

  console.log(sql);

  db.handle_database(sql, callback);

  function callback(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }

    var sql = "UPDATE agendamento set data_agendamento=" + (agendamento.data_agendamento != '' ? "'" + agendamento.data_agendamento + "'" : null) + ", data_vencimento = " + (agendamento.data_vencimento != '' ? "'" + agendamento.data_vencimento + "'" : null) + ", tecnico_id = " + agendamento.tecnico_id + ", ";
        sql+= "hora_agendamento = " + agendamento.hora_agendamento + ", periodo = " + agendamento.periodo + ", cliente='" + agendamento.cliente + "', cpf = '" + agendamento.cpf + "', statusagendamento = " + agendamento.statusagendamento;
        sql+= ", telefone = '" + agendamento.telefone + "', usuario = '" + agendamento.usuario + "', senha='" + agendamento.senha + "', plano = '" + agendamento.plano + "', descricao = '" + agendamento.descricao + "' where id = " + agendamento.id;

    console.log(sql);

    db.handle_database(sql, trataResult);
  }
  function trataResult(result) {
    console.log(result);
    if(result === null){
      cb({code: 500,msg: 'Ocorreu um erro no sistema, aguarde a normalização e tente novamente.'});
      return;
    }
    cb(null, {data: result, msg:"Agendamento atualizacao com suscesso!"});
  }
}
module.exports = model;
