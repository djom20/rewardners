'use strict';

angular.module('rewardners')
  .controller('StarsController', function($scope, $rootScope, $state,
      Place, CurrentSession) {
    var session = CurrentSession.session;

    

    //.:: ::.

    $scope.initialize = function(){
      $scope.user = session.user;
      $scope.title = session.appName;
      $scope.setPlacesWithStars();
    };


    $scope.setPlacesWithStars = function() {
      $rootScope.loadingReedems = false;
      $scope.getPlacesWithStars();
    };

    $scope.getPlacesWithStars = function(){

      if(!$rootScope.loadingReedems){
        $rootScope.loadingReedems = true;
        Place.withStars()
          .then(function(placesWithStars) {
            $scope.placesWithStars = placesWithStars;
            $scope.noMorePlacesWithStarsAvailable = false; 
            $rootScope.loadingReedems = false;
          }, function(error){
            console.log("An error happened matching Places");
          });
      }
    };

    

    $scope.initialize();

  });
