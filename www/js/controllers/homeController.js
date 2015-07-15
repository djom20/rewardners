'use strict';

angular.module('nicu')
  .controller('HomeController', function($scope, $rootScope, $state, $stateParams, 
      $ionicModal, $ionicScrollDelegate, $timeout, CurrentSession,
      ContentItemForm, HomeEntry, Feed, TrackingItem, TrackingItemHelper, TrackingItemModal, NeoPopup) {
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
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    };

    $scope.getPromos = function(){
      session.promos = session.promos || [];

      if(!$rootScope.loadingPromos){
        $rootScope.loadingPromos = true;
        Promo.show(session.user.id, session.promos.length)
          .then(function(promos) {
            if(promos.length > 0){
              session.promos = session.promos.concat(promos);
              $scope.promos = session.promos;
              $scope.noMoreEntriesAvailable = false;
            }else{
              console.log("NO more feed items.");
              $scope.noMoreEntriesAvailable = true;
            }
            $timeout($rootScope.setFeedAsComplete, 1500);
          }, function(){
            $timeout($rootScope.setFeedAsComplete, 1500);
          });
      }
    };

    $scope.setPromos();

    $scope.$watchCollection(function(){
      return session.promos || [];
    }, function(){
      if(session.promos){
        $scope.promos = session.promos;
        $scope.noMoreEntriesAvailable = false;
      }
    });

  });
