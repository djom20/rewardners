'use strict';

angular.module('rewardners')
  .controller('FavoritePromosController', function($scope, $rootScope, $state,
      Promo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.items = [];
    $scope.fullname = (session.user) ? session.user.full_name : '';

    //.:: ::.

    $scope.initialize = function(){
      $scope.setPromos();
      $scope.getTakenPromos();
    };

    $scope.loadMore = function(){
      console.log("Loading Promos...");
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
      session.favoritePromos = session.promos || [];

      if(!$rootScope.loadingPromos){
        $rootScope.loadingPromos = true;
        Promo.favorites()
          .then(function(promos) {
            if(promos.length > 0){
              session.favoritePromos = session.favoritePromos.concat(promos);
              $scope.favoritePromos = session.favoritePromos;
              $scope.noMorePromosAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMorePromosAvailable = true;
            }
            $rootScope.loadingPromos = false;
          }, function(error){
            console.log("An error happened matching Promos");
          });
      }
    };


    $scope.showPromo = function () {
      $state.go('home.promo', { promo: this.promo } );
    };

    $scope.initialize();

  });
