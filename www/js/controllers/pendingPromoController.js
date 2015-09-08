'use strict';

angular.module('rewardners')
  .controller('PendingPromoController', function($scope, $state, $stateParams,
      $ionicPopup, $cordovaBarcodeScanner,
      TakenPromo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.fullname = (session.user) ? session.user.full_name : '';

    //.:: ::.

    $scope.initialize = function(){
      $scope.setPendingTakenPromos();
    };

    $scope.setPendingTakenPromos = function(){
      if ($stateParams.takenPromos){
        $scope.takenPromos = $stateParams.takenPromos;
      } else {
        $scope.getPendingTakenPromos();
      }
    }

    $scope.getPendingTakenPromos = function(){
      TakenPromo.pendingApproval()
        .then(function(takenPromos) {
          if(takenPromos.length > 0){
            $scope.takenPromos = takenPromos;
            $scope.noMorePromosAvailable = false;
          }else{
            console.log("NO more taken promos items.");
            $scope.noMorePromosAvailable = true;
          }
        }, function(error){
          console.log("An error happened matching Promos");
        });
    };

    $scope.approve = function(){
      this.takenPromo.resolve(true).then(function(){
        console.log("Pending promo resolved");
      }, function(error){
        console.log("An error resolving this pending promo");
      });
    };

    $scope.reject = function(){
      this.takenPromo.resolve(false).then(function(){
        console.log("Pending promo resolved");
      }, function(error){
        console.log("An error resolving this pending promo");
      });
    };

    $scope.scanQR = function searchByQR(){
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        console.log("code -> " + imageData.text);    
        $scope.searchPromoCode(imageData.text);
      }, function(error) {
          console.log("An error happened -> " + error);
      });
    };

    $scope.searchPromoCode = function(promoCode){
      TakenPromo.promoCodeSearch(promoCode).then(
        function(results){
          var takenPromos = results;
          var successAlert = $ionicPopup.alert({
            title: 'Coupon Found'
          });
          successAlert.then(function(res){
            $state.go('home.pending_promos', { takenPromos: takenPromos } );
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
