(function () {
  'use strict';

  var path = require('path');

  var model = require('./model');
  var utils = require('../utils')

  var controller = {};

  controller.consultarInstalacao = function (buscaCliente,userId, filtrarCancelada, filtrarData,filtrarHoje, cb) {
    console.log("consultar Instalacao")
    return model.consultarAgendamento(2, buscaCliente,userId,filtrarCancelada, filtrarData, filtrarHoje, cb);
  }

  controller.consultarManutencoes = function (buscaCliente, userId, filtrarCancelada, filtrarHoje, cb) {
    console.log("consultar Manutencoes")
    return model.consultarAgendamento(1, buscaCliente,userId, filtrarCancelada, undefined, filtrarHoje, cb);
  }

  controller.excluirAgendamento = function (idAgendamento, cb) {
    console.log("excluir Agendamento")
    return model.excluirAgendamento(idAgendamento, cb);
  }

  controller.CarregaAgendamento = function(idAgendamento, cb) {
    console.log("excluir Agendamento")
    return model.CarregaAgendamento(idAgendamento, cb);
  }

  controller.atualizarAgendamento = function(agendamento, cb) {
    console.log("atualiza Agendamento")
    return model.atualizarAgendamento(agendamento, cb);
  }

  module.exports = controller;
}());
