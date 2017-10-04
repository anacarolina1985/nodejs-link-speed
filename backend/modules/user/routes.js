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
routes.get('/listarPerfis', listaPerfis);
routes.post('/cadastrar', cadastrar);
routes.post('/consultarUsuarios', consultarUsuarios);
routes.post('/excluirUsuario', excluirUsuario);
routes.post('/CarregaUsuario', CarregaUsuario);
routes.post('/atualizarUsuario', atualizarUsuario);

function listaPerfis(req,resp) {

  controller.listaPerfis(function(err,result){
    console.log(result)
    resp.json({ success : true, data : result, msg : "Sucesso" });
  });
}

function cadastrar(req,resp) {

  var user = req.body.user;
  console.log(user);
  controller.cadastrar(user, function(err,result){
    ResponseCB(err,result,resp);
  });
}

function consultarUsuarios(req,resp) {

    var buscaUsuario = req.body.buscaUsuario;
    console.log(buscaUsuario);
    controller.consultarUsuarios(buscaUsuario, function(err,result){
      resp.json({ success : true, data : result, msg : result.msg });
    });
}

function excluirUsuario(req, resp) {

  var idUsuario = req.body.idUsuario;
  console.log(idUsuario);

  controller.excluirUsuario(idUsuario, function(err,result){
    ResponseCB(err, result, resp);
  });
}

function CarregaUsuario(req, resp) {

  var idUsuario = req.body.idUsuario;
  console.log(idUsuario);

  controller.CarregaUsuario(idUsuario, function(err,result){
    ResponseCB(err, result, resp);
  });
}

function atualizarUsuario(req, resp){
  var user = req.body.user;
  console.log(user);
  controller.atualizarUsuario(user, function(err,result){
    ResponseCB(err,result,resp);
  });
}

module.exports = routes;
