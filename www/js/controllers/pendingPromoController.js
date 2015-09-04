'use strict';

angular.module('rewardners')
  .controller('PendingPromoController', function($scope, $rootScope, $state,
      TakenPromo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.fullname = (session.user) ? session.user.full_name : '';

    //.:: ::.

    $scope.initialize = function(){
      $scope.getPendingTakenPromos();
    };

    $scope.loadMore = function(){
      console.log("Loading Promos...");
      $scope.getPendingTakenPromos();
    };

    $scope.getPendingTakenPromos = function(){

      // if(!$rootScope.loadingPromos){
        // $rootScope.loadingPromos = true;
        TakenPromo.pendingApproval($scope.user.id)
          .then(function(takenPromos) {
            if(takenPromos.length > 0){
              $scope.takenPromos = takenPromos;
              $scope.noMorePromosAvailable = false;
            }else{
              console.log("NO more taken promos items.");
              $scope.noMorePromosAvailable = true;
            }
            // $rootScope.loadingPromos = false;
          }, function(error){
            console.log("An error happened matching Promos");
          });
      // }
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


    $scope.initialize();

  });
