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
routes.post('/login', login);
routes.post('/recoveryPassword', recoveryPassword);

function login(req,resp) {

  var email = req.body.email;
  var password = req.body.password;
  var profile = req.body.profile;

  controller.login(email, password, profile, function(err,result){
    console.log(result);
    if(err){
      console.log("erro !");
      resp.status(err.code);
      return resp.json({success : false, data : null, msg : err.msg});
    }
    if(result.length <=0){
      console.log("Não encontrado !");
      return resp.json({ success : false, data : null, msg : "Usuário não encontrado" });
    }else{
      return resp.json({ success : true, data : result, msg : "" });
    }
  });
}

function recoveryPassword(req,resp) {

  var email = req.body.emailRecovery;

  controller.recoveryPassword(email, function(err,result){
    enviaEmailLogin(req, resp, email, result);
    ResponseCB(err,result,resp);
  });
}



var enviaEmailLogin = function(req,resp, email, result) {

    var nodemailer  = require('nodemailer');
    var sgTransport = require('nodemailer-sendgrid-transport');

    // username + password
    var options = {
        auth: {
            api_user: 'speedlink',
            api_key: 'speed1234'
        }
    }

    var mailer = nodemailer.createTransport(sgTransport(options));

    var email = {
        to: email,
        from: 'link.speed@hotmail.com',
        subject: 'Link Speed - Change Password',
        text: 'Your password was changed by application -> ' + email + " : " + result,
        html: '<b>Your password was changed by application </b> <br>' + email + " : " + result
    };

    mailer.sendMail(email, function(err, res) {
        if (err) {
            console.log(err)
        }
        console.log(res);
    });

  }


module.exports = routes;
