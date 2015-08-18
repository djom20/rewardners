'use strict';

angular.module('rewardners')
  .controller('LoginController', function($scope, $rootScope, $state,
                                          User, CurrentSession, LoginService,
                                          $localstorage, $ionicModal, $ionicPopup
                                          ) {

    var session, resource;

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
      login();
    };

    $scope.showModal = function(templateUrl) {
      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    }

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove();
      $localstorage.set("video_seen", "seen");
    };

    $scope.register = function(){
      $state.go('register.main');
    }

    initalize();

    /***********  Private functions *****************/

    function initalize(){
      session = CurrentSession.session;
      $scope.$parent.title = session.appName;
      $scope.auth = session.auth;
      $scope.session = session;
      $scope.processing = false;
      $scope.video_seen = $localstorage.get("video_seen") !== undefined;
      // for debug only
      $scope.quickLogin = (session.quicklogin !== undefined && session.quicklogin.enabled);
      showIntroductionVideo();
    };

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
          $ionicPopup.alert({
            title: 'Login Error',
            template: 'Please verify your credentials and try again.'
          });
          $scope.invalidPassword = true;
          $scope.processing = false;
        });
    }

    function showIntroductionVideo(){
      if(!$scope.video_seen){
        $scope.showModal("views/modals/introduction_video.html");
      }
    }



  });
