'use strict';

angular.module('rewardners')
  .controller('RegistrationController', function($scope, $rootScope, $state,
                                          User, RegistrationService,
                                          $ionicModal, $ionicPopup
                                          ) {

    var resource;

    $scope.submit = function () {
      if($scope.registration_data.terms){
        $scope.processing = true;
        register();
      } else {
        $ionicPopup.alert({
          template: 'Please accept the Terms and Conditions to continue.'
        });
      }
    };

    $scope.showTerms = function () {
      $ionicModal.fromTemplateUrl('views/modals/terms_conditions.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $scope.modal.remove();
    };
    initalize();

    /***********  Private functions *****************/

    function initalize(){
      $scope.processing = false;
      $scope.title = "Registration";
      $scope.registration_data = {};
      $scope.registration_data.terms = false;
    };

    function register() {

      resource = RegistrationService.register($scope.registration_data);
      resource.$promise
        .then(function (data) {
          $scope.processing = false;
          $state.go('register.success');
        }, function (data) {
          console.log('Registration Error: ' + JSON.stringify(data));
          $ionicPopup.alert({
            title: 'Registration Error',
            template: 'We had an error registering you account. Please verify all information and try again.'
          });
        });
    }


  });
