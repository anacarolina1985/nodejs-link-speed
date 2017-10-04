'use strict';

var mysql    = require('mysql');
var async    = require("async");
var database = {};
var config = {};

if(process.env.OPENSHIFT_NODEJS_IP){
      /*
        Configurando o acesso ao db do Openshift.
        Acessando através das variaveis de processo do servidor.

      */

    // database = mysql.createPool({
    //         connectionLimit : 10
    //       , host     : process.env.OPENSHIFT_MYSQL_DB_HOST
    //       , port     : process.env.OPENSHIFT_MYSQL_DB_PORT
    //       , user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME
    //       , password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD
    //       , database : 'homolog'
    // });
    config = {
            host     : process.env.OPENSHIFT_MYSQL_DB_HOST
          , port     : process.env.OPENSHIFT_MYSQL_DB_PORT
          , user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME
          , password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD
          , database : process.env.OPENSHIFT_GEAR_NAME
    };

    console.log("Openshift database");
}else{
  /*
    Configuração local do db.
  */

  config = {
       host     : '127.0.0.1' // Host do Mysql
      ,user     : 'root'  // Usuário do banco
      ,password : 'root'  // Senha do banco
      ,database : 'speedlink' // Banco de dados
  };

  console.log("local database");

}

// Always use MySQL pooling.
// Helpful for multiple connections.

var pool    =   mysql.createPool({
    connectionLimit : 100,
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database,
    debug    :  true
});

database.handle_database = function(sql,callback) {
   async.waterfall([
    function(callback) {
        pool.getConnection(function(err,connection){
          if(err) {
                   // if there is error, stop right away.
                   // This will stop the async code execution and goes to last function.
            callback(true);
          } else {
            callback(null,connection);
          }
        });
    },
     function(connection,callback) {
        callback(null,connection,sql);
     }
    ,function(connection,sql,callback) {
       connection.query(sql,function(err,rows){
           connection.release();
        if(!err) {
            callback(rows.length === 0 ? false : rows);
        } else {
             // if there is error, stop right away.
            // This will stop the async code execution and goes to last function.
            callback(true);
         }
    });
       }],
       function(result){
      // This function gets call after every async task finished.
      if(typeof(result) === "boolean" && result === true) {
        callback(null);
      } else {
        callback(result);
      }
    });
}

module.exports = database;
