'use strict';

angular.module('rewardners')
  .controller('PromosFavoritesController', function($scope, $rootScope, $state,
      Promo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.fullname = (session.user) ? session.user.full_name : '';

    //.:: ::.

    $scope.initialize = function(){
      $scope.setPromosFavorites();
    };

    $scope.loadMore = function(){
      console.log("Loading PromosFavorites...");
      $scope.getPromosFavorites();
    };

    $scope.setPromosFavorites = function() {
      $rootScope.loadingPromosFavorites = false;
      $scope.getPromosFavorites();
    };

    $scope.getPromosFavorites = function(){
      session.promosFavorites = session.promosFavorites || [];

      if(!$rootScope.loadingPromosFavorites){
        $rootScope.loadingPromosFavorites = true;
        Promo.favorites()
          .then(function(promosFavorites) {
            if(promosFavorites.length > 0){
              session.promosFavorites = session.promosFavorites.concat(promosFavorites);
              $scope.promosFavorites = session.promosFavorites;
              $scope.noMorePromosFavoritesAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMorePromosFavoritesAvailable = true;
            }
            $rootScope.loadingPromosFavorites = false;
          }, function(error){
            console.log("An error happened matching PromosFavorites");
          });
      }
    };

    $scope.showPromo = function () {
      $state.go('home.promo', { promo: this.promo } );
    };

    $scope.initialize();

  });
