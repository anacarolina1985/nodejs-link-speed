(function () {
  'use strict';
  var express        = require('express');
  var cookieParse    = require('cookie-parser');
  var expressSession = require("express-session");
  var bodyParser     = require('body-parser');
  var path           = require('path');
  var Middleware     = require('connect-multiparty');
  var redisStore     = require('connect-redis')(expressSession);
  var redis          = require("redis");
  var client         = redis.createClient();
  var app            = express();

  app.use(express.static(path.join(__dirname,'/frontend/')));
  app.use(Middleware())
  app.use(cookieParse());
  if(process.env.OPENSHIFT_NODEJS_IP){
    app.use(expressSession({ resave: false, saveUninitialized: true, secret: 'speedlink',
                        store: new redisStore({ host: process.env.OPENSHIFT_MYSQL_DB_HOST, port: process.env.OPENSHIFT_MYSQL_DB_PORT, client: client, ttl :  260})
    }));
  }else{
    app.use(expressSession({ resave: false, saveUninitialized: true, secret: 'speedlink',
                        store: new redisStore({ host: '127.0.0.1', port: '', client: client, ttl :  260})
    }));
  }
  app.set('trust proxy', 1) // trust first proxy
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  /*
  Setando endereço e porta de acesso.
  */

  var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
  var port      = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;


  app.listen(port,ipaddress, function() {
    console.log("Server Up on ", new Date());
  });

  var api =  {};
        api.auth          = require('./backend/modules/auth/routes');
        api.user          = require('./backend/modules/user/routes');
        api.agendamento          = require('./backend/modules/agendamento/routes');
        api.visualizacao          = require('./backend/modules/visualizacao/routes');

        app.use('/api/v1/auth'          , api.auth);
        app.use('/api/v1/user'          , api.user);
        app.use('/api/v1/agendamento'  , api.agendamento);
        app.use('/api/v1/visualizacao'   , api.visualizacao);

        app.get('/', function(req, res) {
          res.render('login.html');
      });

}());
