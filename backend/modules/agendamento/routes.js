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
routes.get('/listarTecnicos', listarTecnicos);
routes.post('/agendarInstalacao', agendarInstalacao);
routes.post('/agendarManutencao', agendarManutencao);

function listarTecnicos(req,resp) {

  controller.listarTecnicos(function(err,result){
    if(err){
      resp.status(err.code);
      return resp.json({success : false, data : null, msg : err.msg});
    }

    return resp.json({ success : true, data : result, msg : null });
  });
}

function agendarInstalacao(req,resp) {

  var agendamento = req.body.agendamento;
  console.log(agendamento);
  controller.agendarInstalacao(agendamento, function(err,result){
    console.log(result);
    ResponseCB(err,result,resp);
  });
}

function agendarManutencao(req,resp) {

  var agendamento = req.body.agendamento;
  console.log(agendamento);
  controller.agendarManutencao(agendamento, function(err,result){
    console.log(result);
    ResponseCB(err,result,resp);
  });
}

module.exports = routes;
