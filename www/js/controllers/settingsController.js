'use strict';

angular.module('rewardners')
  .controller('SettingsController', function($scope, $state,
                                          User, CurrentSession,
                                          $ionicModal, $ionicPopup
                                          ) {
    var session = CurrentSession.session;
    var resource;

    $scope.submit = function () {
      $scope.processing = true;
      update();
    };

    initalize();

    /***********  Private functions *****************/

    function initalize(){
      $scope.processing = false;
      $scope.title = "Settings";
      $scope.user = session.user;
    };

    function update() {
      $scope.user.save()
        .then(function (user) {
          $scope.processing = false;
          session.promos = undefined; 
          $ionicPopup.alert({
            title: 'Account settings updated!',
          });
        }, function (data) {
          console.log('Registration Error: ' + JSON.stringify(data));
          $ionicPopup.alert({
            title: 'Setting update error Error',
            template: 'We had an error updating you account. Please verify all information and try again.'
          });
        });
    }


  });
