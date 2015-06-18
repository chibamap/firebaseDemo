'use strict';

/**
 * @ngdoc overview
 * @name App
 * @description
 * # App
 *
 * Main module of the application.
 */
angular
  .module('App', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'ngStorage',
		'ui.bootstrap',
		'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/firebase.html',
        controller: 'FirebaseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
//	.run(function () {
		// TODO: something
//	})
	;
