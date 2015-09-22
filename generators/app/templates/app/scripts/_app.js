'use strict';

/**
 * @ngdoc overview
 * @name <%= appName %>
 * @description
 * # App
 * AngularJS module for the whole application
 */
var app = angular.module('<%= appName %>', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.when('/actionmenu', {
		templateUrl: 'views/actionmenu.html',
		controller: 'ActionMenuCtrl'
	})
    .otherwise({
      redirectTo: '/'
    });
});