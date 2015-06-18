'use strict';

describe('Controller: FirebaseCtrl', function () {

  // load the controller's module
  beforeEach(module('App'));

  var FirebaseCtrl, scope, modal, fireChat;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    FirebaseCtrl = $controller('FirebaseCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
