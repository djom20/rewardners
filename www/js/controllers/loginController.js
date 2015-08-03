'use strict';

angular.module('rewardners')
  .controller('LoginController', function($scope, $rootScope, $state, 
                                          // $ionicPopup,
                                          User, CurrentSession, LoginService
                                          // , RegistrationService
                                          //, Article, Reminder, Baby, Event
                                          ) {

    var session = CurrentSession.session,
        retries = 0,
        resource;

    $scope.$parent.title = session.appName;
    $scope.auth = session.auth;
    $scope.session = session;
    $scope.success = true;
    $scope.processing = false;
    // for debug only
    $scope.quickLogin = (session.quicklogin !== undefined && session.quicklogin.enabled);

    $scope.debugLogin = function() {
      var username = session.getItem('username');
      var password = session.getItem('password');
      if (username && password) {
        $scope.user.username = username;
        $scope.user.password = password;
        login();
      } else {
        console.log('no saved credentials. you need to login at least once')
      }
    };

    $scope.hasQuickLogin = function () {
      return session.getItem('username') && session.getItem('password');
    };

    $scope.submit = function () {
      $scope.processing = true;
      // no state there for we are here for the first time
      if (!session.auth.state) {
        // we have entered the password
        login();
      } else {
        // this is a bad state
        session.auth.state = undefined;
        $scope.processing = false;
      }
    };

    /***********  Private functions *****************/

    function login() {
      if ($scope.quickLogin) {
        // save the username & password for quick debug login
        // this will only work in devint enviroment
        session.setItem('username', $scope.auth.email);
        session.setItem('password', $scope.auth.password);
      }

      resource = LoginService.login({email: $scope.auth.email, password: $scope.auth.password});
      resource.$promise
        .then(function (data) {
          var sessionData = data.sessions[0];
          session.authentication_token = sessionData.authentication_token;
          session.user = new User(sessionData);
          session.auth.state = 'logged_in';
          delete session.auth.password;

          // TODO load promos
          // Promos.all({}).then(
          //   function(promos) {
          //     session.member.promos = promos.sortBy("start");
          //     $scope.promos = session.member.promos;
          //   },
          //   function(promos) {
          //     console.log('error getting promos from API');
          //   });

          // now go home.main
          $state.go('home.main');

        }, function (data) {
          console.log('got an error from the API ');
          console.log(data);
          $scope.invalidPassword = true;
          $scope.processing = false;
        });
    }
  });
