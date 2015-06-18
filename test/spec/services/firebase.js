'use strict';

describe('Service: firebase', function () {

  // load the service's module
  beforeEach(module('App'));

  // instantiate service
  var fireAuth, fireChat;
  beforeEach(inject(function (_fireAuth_, _fireChat_) {
    fireAuth = _fireAuth_;
		fireChat = _fireChat_;
  }));
/*
	describe('fireAuth login failed', function() {

		beforeEach(function(done){
      alert('failed');
			fireAuth.facebookLogin().then(function(userinfo){
				done(userInfo);
			},function(userinfo){
				done(userinfo);
			});
		});
		it('should be not refer user information', function (done) {
			expect(done).toBe(null);
		});
	});
	describe('fireAuth login success', function() {

		beforeEach(function(done){
      alert('success');
			fireAuth.facebookLogin().then(function(userinfo){
				done();
			}, function(userinfo){
				done(userinfo);
			});
		});
		it('should refer user information', function (done) {
			expect(done.name).not.toBe(null);
		});
	});
*/
});
