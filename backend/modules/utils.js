(function () {

'use strict';

var crypto = require('crypto')
var jwt = require('jsonwebtoken');
var Promise = require("es6-promise").Promise;
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var obj = {};


    obj.generatePassword = function (password) {
      return new Promise(function(resolve, reject) {
              try {
                var encrypt = '*speedlink';
                    encrypt += password.toString();
                password = crypto
                            .createHash('MD5')
                            .update(encrypt)
                            .digest('base64');
                      resolve(password);
              } catch (e) {
                    reject(e);
              }
      });
    };
    obj.generateToken = function (user) {
      return new Promise(function(resolve, reject) {
        try {
          var secret = 'speedlink';
          var options = { expiresIn: (1440*60) }; // 1440 minutes or 24h
          var token = jwt.sign(user, secret, options);
          resolve(token);
        } catch (e) {
          reject(e);
        }
      });
    };
    obj.validToken = function (token) {
      return new Promise(function(resolve, reject) {
        jwt.verify(token, 'speedlink',function (err,decode) {
            if(err){ reject("Token inválido"); return;}
            resolve(decode);
        });
      });
    };
    obj.uploadFile = function (file,config) {
      return new Promise(function(resolve, reject) {

        if(config.name === undefined){reject("arquivo sem nome"); return;}
        if(config.path === undefined){reject("Um caminho é obrigatório"); return;}

        var url = path.join(__dirname,'../../front-end/');
            url += config.path;
            url = path.normalize(url);
            console.log(file);

        fs.readFile(file.path, function (err, data) {
            if(err){
              console.log("Erro -"+err);
              reject(err);
              return;
            }
            var upload = function () {
              var  newPath = url+'/'+config.name+'.'+file.type.split('/')[1];
              fs.writeFile(newPath, data, function (err) {
                  if(err){
                    reject(err);
                    return;
                  }
                  resolve(newPath);
                  console.log("Arquivo Salvo com Sucesso!");
              });
            }
            if (!fs.existsSync(url)){
              mkdirp(url, function (err) {
                if (err) { console.error(err); }
                else { upload(); }
              });
            }else{ upload(); }

          });
      });
    };
  module.exports = obj;
})();
