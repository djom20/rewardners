'use strict';

angular.module('rewardners')
  .controller('PromoController', function($scope, $state, $stateParams, $ionicPopup,
      Promo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.showQr= false;
    //.:: ::.

    $scope.setPromo = function() {

      if (typeof $stateParams.promo === "undefined") {
        $state.go('home.main');
      }else{
        $scope.promo = $stateParams.promo;
      }
    };

    $scope.takePromo = function() {
      $scope.promo.take(
        function(data){
           console.log('Taken Yeah');
        }, function(error){
          console.log('got an error from the API');
          console.log(data);
          $ionicPopup.alert({
            title: 'An error just Happened',
            template: 'Please try again later.'
          });
        });
    };

    $scope.generateQr = function(){
      $scope.showQr = true;
    };

    $scope.setPromo();

  });
