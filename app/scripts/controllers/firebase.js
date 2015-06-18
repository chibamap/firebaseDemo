'use strict';

/**
 * @ngdoc function
 * @name App.controller:FirebaseCtrl
 * @description
 * # FirebaseCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('FirebaseCtrl', function ($scope, $modal, fireChat, fireAuth, fbMessages) {

    var self = this;
    $scope.loggedin = false;
    $scope.messages = [];

    $scope.login = function() {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: function($scope, $modalInstance, socials){
          $scope.socials = socials;
          $scope.select = function(key) {
            fireAuth.login(key);
            $modalInstance.close();
          };
          $scope.cancel = function(){
            $modalInstance.dismiss();
          };
        },

        resolve: {
          socials: function () {
            return [
              {key:'facebook', label:'Facebook'},
              {key:'twitter', label:'twitter'},
              {key:'github', label: 'github'},
              {key:'google', label: 'google'}
            ];
          }
        }
      });
      
    };
    $scope.logoff = function(){
      fireAuth.logoff();
    };
		$scope.send = function() {
      if ($scope.message) {
			  fireChat.postMessage($scope.message).then(function(){
				  $scope.message = '';
			  });
      }
		};
    fbMessages.$watch(function(snapshot){
      // 説明しやすいように直接参照
      $scope.messages = fbMessages;
    });
    fireAuth.auth();

    $scope.$on('auth', function(events, userInfo) {
      if (userInfo) {
        $scope.username = userInfo.name;
        $scope.loggedin = true;
      } else {
        $scope.username = '';
        $scope.loggedin = false;
      }
    });
    $scope.update = function(){
      $scope.messages = fbMessages;
    };
  });
