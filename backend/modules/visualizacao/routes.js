'use strict';
var express    = require('express');
var routes     = express.Router();
var controller = require('./controller');

/*
  Função criada para responstas do servidor.
  @err  - valor vem null, a não ser que exista algum erro.
  @data - valor de resposta do servidor.
  @resp - variavel do Express, tem que ser enviada por parametro para que seja
          possível responder a requisição
*/
var ResponseCB = function(err,data,resp) {

    if(err){
      resp.status(err.code);
      return resp.json({success : false, data : null, msg : err.msg});
    }

    return resp.json({ success : true, data : data.data, msg : data.msg });

}

// Listagem de Rotas do Usuário.
routes.post('/consultarInstalacao', consultarInstalacao);
routes.post('/consultarManutencoes', consultarManutencoes);
routes.post('/excluirAgendamento', excluirAgendamento);
routes.post('/CarregaAgendamento', CarregaAgendamento);
routes.post('/atualizarAgendamento', atualizarAgendamento);

function consultarInstalacao(req,resp) {

  var buscaCliente = req.body.buscaCliente;
  var userId = req.body.userId;
  var filtrarCancelada = req.body.filtrarCancelada;
  var filtrarData = req.body.filtrarData;
  var filtrarHoje = req.body.filtrarHoje;

  console.log(buscaCliente);
  console.log(userId);
  console.log(filtrarCancelada);
  console.log(filtrarData);
  console.log(filtrarHoje);

  controller.consultarInstalacao(buscaCliente,userId,filtrarCancelada, filtrarData, filtrarHoje, function(err,result){
    resp.json({ success : true, data : result, msg : result.msg });
  });
}

function consultarManutencoes(req,resp) {

  var buscaCliente = req.body.buscaCliente;
  var userId = req.body.userId;
  var filtrarCancelada = req.body.filtrarCancelada;
  var filtrarHoje = req.body.filtrarHoje;

  console.log(buscaCliente);
  console.log(userId);
  console.log(filtrarCancelada);
  console.log(filtrarHoje);

  controller.consultarManutencoes(buscaCliente,userId,filtrarCancelada, filtrarHoje, function(err,result){
    resp.json({ success : true, data : result, msg : result.msg });
  });
}

function excluirAgendamento(req, resp) {

  var idAgendamento = req.body.idAgendamento;
  console.log(idAgendamento);

  controller.excluirAgendamento(idAgendamento, function(err,result){
    ResponseCB(err, result, resp);
  });
}

function CarregaAgendamento(req,resp) {

  var idAgendamento = req.body.idAgendamento;

  console.log(idAgendamento);

  controller.CarregaAgendamento(idAgendamento, function(err,result){
    ResponseCB(err, result, resp);
  });
}

function atualizarAgendamento(req, resp){
  var agendamento = req.body.agendamento;

  console.log(agendamento);

  controller.atualizarAgendamento(agendamento, function(err,result){
    ResponseCB(err, result, resp);
  });
}
module.exports = routes;
