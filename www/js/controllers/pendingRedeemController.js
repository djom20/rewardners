'use strict';

angular.module('rewardners')
  .controller('PendingRedeemsController', function($scope, $rootScope, $state,
      PendingRedeem, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.items = [];

    //.:: ::.

    $scope.initialize = function(){
      $scope.setPendingRedeems();
    };


    $scope.setPendingRedeems = function() {
        $rootScope.loadingReedems = false;
        $scope.getPendingRedeems();
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

    $scope.initialize();

  });
