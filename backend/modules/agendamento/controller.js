(function () {
  'use strict';

  var path = require('path');

  var model = require('./model');
  var utils = require('../utils')

  var controller = {};

  controller.listarTecnicos = function (cb) {
    console.log("lista Tecnicos")
    return model.listarTecnicos(cb);
  }

  controller.agendarInstalacao = function (agendamento, cb) {
    console.log("agendar Instalacao");
    return model.agendar(2, agendamento, cb);
  }

  controller.agendarManutencao = function (agendamento, cb) {
    console.log("agendar Instalacao")
    return model.agendar(1, agendamento, cb);
  }

  module.exports = controller;
}());
