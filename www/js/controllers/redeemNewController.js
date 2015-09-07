'use strict';

angular.module('rewardners')
  .controller('RedeemNewController', function($scope, $state, $stateParams, 
      $ionicPopup, CurrentSession, Redeem) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    //.:: ::.

    $scope.initialize = function(){
      $scope.setPendingRedeem();
      $scope.redeem = new Redeem({place_id: $scope.pendingRedeem.place_id, 
        user_id: $scope.pendingRedeem.user_id });
    };

    $scope.submit = function () {
      $scope.redeem.save().then(function(redeemSaved){
        var successPopup = $ionicPopup.alert({
          title: 'New Redeem created'
        });
        successPopup.then(function(){
          $state.go('home.pending_redeems' );
        });
      }, function (data) {
        console.log('Redeem creation Error: ' + JSON.stringify(data));
        $ionicPopup.alert({
          title: 'Redeem creation Error',
          template: 'We had an error Creating your Redeem. Please verify all information and try again.'
        });
      })
    };

    $scope.setPendingRedeem =  function() {
      $scope.pendingRedeem = $stateParams.pendingRedeem;
    };

    $scope.initialize();

  });