'use strict';

angular.module('rewardners')
  .controller('PlacesController', function($scope, $rootScope, $state,
      Place, CurrentSession) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    $scope.sideMenu = 'Menu';
    $scope.items = [];

    //.:: ::.

    $scope.initialize = function(){
      $scope.setPlaces();
    };

    $scope.loadMore = function(){
      console.log("Loading Places...");
      $scope.getPlaces();
    };

    $scope.setPlaces = function() {

      if (typeof session.Places === "undefined") {
        $rootScope.loadingPlaces = false;
        $scope.getPlaces();
      }else{
        $scope.places = session.places;
      }
    };

    $scope.getPlaces = function(){
      session.places = session.places || [];

      if(!$rootScope.loadingPlaces){
        $rootScope.loadingPlaces = true;
        Place.own()
          .then(function(places) {
            if(places.length > 0){
              session.places = session.places.concat(places);
              $scope.places = session.places;
              $scope.noMorePlacesAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMorePlacesAvailable = true;
            }
            $rootScope.loadingPlaces = false;
          }, function(error){
            console.log("An error happened matching Places");
          });
      }
    };

    $scope.showPlace = function () {
      $state.go('home.place', { place: this.place } );
    };

    $scope.initialize();

  });
