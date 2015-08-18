angular.module('rewardners')
    .controller('MainController', function($scope, $rootScope, $state,
                                           CurrentSession) {
    // sanity check
    if (!CurrentSession.session.isAuthenticated())
      $state.go('login');

    // application start time
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.items = [];
    $scope.fullname = (session.user) ? session.user.full_name : '';

    $scope.logout = function () {
      session.clearSession();
      $state.go('login');
    };

  });
