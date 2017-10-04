(function () {
  'use strict';

  var path = require('path');

  var model = require('./model');
  var utils = require('../utils')

  var controller = {};

  controller.listaPerfis = function (cb, req, res) {
    console.log("lista Perfis")
    return model.listaPerfis(cb);
  }

  controller.cadastrar = function (user, cb) {
    console.log("cadastrar usuário")

    utils.generatePassword(user.password).then(function (result) {
      console.log("Senha gerada: " + result);
      user.password = result;
      console.log("Senha setada no user: " + user.password);
      return model.cadastrar(user, cb);
    },function (){
      cb(defaultError,null)
      return;
    })
  }

  controller.consultarUsuarios = function (buscaUsuario, cb) {
    console.log("consulta Usuários")
    return model.consultarUsuarios(buscaUsuario, cb);
  }

  controller.excluirUsuario = function (idUsuario, cb) {
    console.log("exclui Usuário")
    return model.excluirUsuario(idUsuario, cb);
  }

  controller.CarregaUsuario = function (idUsuario, cb){
    console.log("Carregar Usuario");
    return model.CarregaUsuario(idUsuario, cb);
  }

  controller.atualizarUsuario = function (user, cb) {
    console.log("atualizarUsuario")
    return model.atualizarUsuario(user, cb);
  }

  module.exports = controller;
}());
