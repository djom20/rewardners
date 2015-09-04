'use strict';

angular.module('rewardners')
  .controller('PlaceController', function($scope, $state, $stateParams, $ionicPopup,
      CurrentSession, Promo) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    //.:: ::.

    $scope.setPlace = function() {

      if (typeof $stateParams.place === "undefined") {
        $state.go('home.places');
      }else{
        $scope.place = $stateParams.place;
        
        Promo.byPlace($scope.place.id)
          .then(function(promos) {
            $scope.promos = promos;
          }, function(error){
            console.log("An error happened matching Promos");
            console.log(error);
          });
      }
    };

    $scope.showPromo = function () {
      $state.go('home.promo', { promo: this.promo } );
    };

    $scope.setPlace();

  });
