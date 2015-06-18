'use strict';

/**
 * @ngdoc service
 * @name App.firebase
 * @description
 * # firebase
 * Service in the App.
 */
angular.module('App')
	.value('fbURL', 'https://{your firebase}.firebaseio.com/')
  .factory('fbRef', function (fbURL) {
		return new Firebase(fbURL);
  })
  .factory('fbMessages', function(fbRef, $firebaseArray) {
    return  $firebaseArray(fbRef.child('test/chat/messages'));
  })
	.service('fireAuth', function(fbRef, $firebaseAuth, $q, $rootScope){
    var self = this;

    var fireAuth = $firebaseAuth(fbRef);
		var userInfo = null;

    this.login =function (type) {
      var def = $q.defer();
      
			fireAuth.$authWithOAuthPopup(type).then(function(authData) {
				def.resolve(userInfo);
			});
			return def.promise;
    };
		this.facebookLogin = function(){
			// login with Facebook
      return this.login('facebook');
		};
    
    this.auth = function(){
      var def = $q.defer();
      if (fireAuth.$getAuth()) {
        def.resolve(userInfo);
        $rootScope.$broadcast(userInfo);
      } else {
        this.facebookLogin().then(function(){
          def.resolve(userInfo);
        }).catch(function(){
          def.reject();
        });
      }
      
      return def.promise;
    };
    this.logoff = function(){
      if (fireAuth.$getAuth()) {
        fireAuth.$unauth();
      }
    };
    this.setupUserinfo = function(auth) {
      userInfo = {
        uid: auth.uid,
        name: ''
      };
      userInfo.name = auth[auth.provider].displayName;
    };
    
    fireAuth.$onAuth(function(auth){
      if (auth) {
        self.setupUserinfo(auth);
      } else {
        userInfo = null;
      }
      $rootScope.$broadcast('auth', userInfo);
    });
    if (fireAuth.$getAuth()) {
      this.setupUserinfo(fireAuth.$getAuth());
    }
	})
	.service('fireChat', function(fbMessages, fireAuth, $q){

    var self = this;

    this.fetch = function(){
      return fbMessages.$loaded();
		};
    this.watch = function(cb) {
      fbMessages.$watch(function(snapshot){
        cb(fbMessages);
      });
    };
		this.postMessage = function(text){
			return fireAuth.auth().then(function(userInfo) {
        fbMessages.$add({author: userInfo.name, content: text});
      });
		};
	});
