'use strict';

angular.module('rewardners')
  .controller('PendingRedeemsController', function($scope, $rootScope, $state, $stateParams,
      PendingRedeem, CurrentSession) {
    var session = CurrentSession.session;

    

    $scope.initialize = function(){
      $scope.user = session.user;
      $scope.title = session.appName;
      $scope.setPendingRedeems();
    };


    $scope.setPendingRedeems = function() {
      if ($stateParams.pendingRedeems === null) {
        $rootScope.loadingReedems = false;
        $scope.getPendingRedeems();
      } else {
        $scope.pendingRedeems = $stateParams.pendingRedeems;
      }
    };

    $scope.getPendingRedeems = function(){

      if(!$rootScope.loadingReedems){
        $rootScope.loadingReedems = true;
        PendingRedeem.pending()
          .then(function(pendingRedeems) {
            if(pendingRedeems.length > 0){
              $scope.pendingRedeems = pendingRedeems;
              $scope.noMorependingRedeemsAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMorependingRedeemsAvailable = true;
            }
            $rootScope.loadingReedems = false;
          }, function(error){
            console.log("An error happened matching Places");
          });
      }
    };

    $scope.newRedeem = function () {
      $state.go('home.redeem_new', { pendingRedeem: this.pendingRedeem } );
    };

    $scope.scanQR = function searchByQR(){
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        console.log("code -> " + imageData.text);    
        $scope.searchPromoCode(imageData.text);
      }, function(error) {
          console.log("An error happened -> " + error);
      });
    };

    $scope.searchPendingUserCode = function(userSearchCode){
      PendingRedeem.pending(userSearchCode).then(
        function(results){
          var pendingRedeems = results;
          var successAlert = $ionicPopup.alert({
            title: 'Pending Redeem for this user found'
          });
          successAlert.then(function(res){
            $state.go('home.pending_redeems', { pendingRedeems: pendingRedeems } );
          });   
        }, function(errors){
          $ionicPopup.alert({
            title: 'Coupon search Error',
            template: 'We were not able to find any coupon with the code submited.'
          });
      });
    }

    $scope.initialize();

  });
