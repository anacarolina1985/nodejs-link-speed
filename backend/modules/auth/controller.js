(function () {
  'use strict';

  var path = require('path');

  var model = require('./model');
  var utils = require('../utils')

  var controller = {};

  controller.login = function (email, password, profile, cb) {
    console.log("login(" + email + ")")
    utils.generatePassword(password).then(function (result) {
      console.log("Senha gerada: " + result);
      password = result;
      console.log("Senha setada no user: " + password);
      return model.login(email, password, profile, cb);
    },function (){
      cb(defaultError,null)
      return;
    })
  }

  controller.recoveryPassword = function(email, cb){
    console.log("login(" + email + ")")
    require('crypto').randomBytes(8, function(err, buffer) {
      var token = buffer.toString('hex');
      console.log(token);
      utils.generatePassword(token).then(function (result) {
        console.log("Senha gerada: " + result);
        var password = result;
        console.log("Senha setada no user: " + password);
        return model.updatePassword(email, password, token, cb);
      });
    },function (){
      cb(defaultError,null)
      return;
    })
  }

  module.exports = controller;
}());
