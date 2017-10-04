(function (angular) {
  'use strict';

  angular.module('common').factory('db',function ($window) {

      var database = {}
      database.set = function(key, value) { $window.localStorage[key] = value; }
      database.get = function(key, defaultValue) {  return $window.localStorage[key] || defaultValue;  }
      database.setObject = function(key, value) {  $window.localStorage[key] = JSON.stringify(value);}
      database.getObject  = function(key) { return JSON.parse($window.localStorage[key] || '{}'); }
      database.clearItem = function(key){ $window.localStorage.removeItem(key) }
      database.drop = function(){ $window.localStorage.clear() }

      return database;
  })



})(angular);