'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.controller:MainCtrl
 * @description
 * # MainCtrl
 * The controller for the main view
 */
app.controller('MainCtrl', function ($scope) {
    $scope.question = 'Who/what is awesome?';
    $scope.answer = 'Firefox OS';
});