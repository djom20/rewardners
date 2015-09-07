'use strict';

angular.module('rewardners')
  .controller('PromosTakenController', function($scope, $rootScope, $state,
      Promo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.items = [];
    $scope.fullname = (session.user) ? session.user.full_name : '';

    //.:: ::.

    $scope.initialize = function(){
      $scope.setPromosTaken();
    };

    $scope.loadMore = function(){
      console.log("Loading PromosTaken...");
      $scope.getPromosTaken();
    };

    $scope.setPromosTaken = function() {
      $rootScope.loadingPromosTaken = false;
      $scope.getPromosTaken();
    };

    $scope.getPromosTaken = function(){
      session.promosTaken = session.promosTaken || [];

      if(!$rootScope.loadingPromosTaken){
        $rootScope.loadingPromosTaken = true;
        Promo.taken()
          .then(function(promosTaken) {
            if(promosTaken.length > 0){
              session.promosTaken = session.promosTaken.concat(promosTaken);
              $scope.promosTaken = session.promosTaken;
              $scope.noMorePromosTakenAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMorePromosTakenAvailable = true;
            }
            $rootScope.loadingPromosTaken = false;
          }, function(error){
            console.log("An error happened matching PromosTaken");
          });
      }
    };

    $scope.showPromo = function () {
      $state.go('home.promo', { promo: this.promo } );
    };

    $scope.initialize();

  });
