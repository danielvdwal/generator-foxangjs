'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.controller:ActionMenuCtrl
 * @description
 * # ActionMenuCtrl
 * The controller for the action menu
 */
app.controller('ActionMenuCtrl', ['$scope', '$location', function($scope, $location) { 
    $scope.goNext = function (hash) { 
      $location.path(hash);
    };
	
	$scope.actionmenu = [{
    	url: 'goNext("/")',
    	title: 'Main'	
    },{
    	url: 'goNext("/")',
    	title: 'Cancel'	
    }];
}]);