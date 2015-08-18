'use strict';

angular.module('rewardners')
  .controller('HomeController', function($scope, $rootScope, $state, $stateParams,
      $ionicModal, Promo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.items = [];
    $scope.fullname = (session.user) ? session.user.full_name : '';

    //.:: ::.

    $scope.loadMore = function(){
      console.log("Loading Feed items...");
      $scope.getPromos();
    };

    $scope.setPromos = function() {

      if (typeof session.promos === "undefined") {
        $rootScope.loadingPromos = false;
        $scope.getPromos();
      }else{
        $scope.promos = session.promos;
      }
    };

    $scope.getPromos = function(){
      session.promos = session.promos || [];

      if(!$rootScope.loadingPromos){
        $rootScope.loadingPromos = true;
        Promo.trendings()
          .then(function(promos) {
            if(promos.length > 0){
              session.promos = session.promos.concat(promos);
              $scope.promos = session.promos;
              $scope.noMorePromosAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMorePromosAvailable = true;
            }
            $rootScope.loadingPromos = false;
          }, function(){
            console.log("An error happened matching Promos");
          });
      }
    };

    $scope.setPromos();

  });
