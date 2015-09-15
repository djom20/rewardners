'use strict';

angular.module('rewardners')
  .controller('PromosController', function($scope, $rootScope, $state, $stateParams,
      Promo, CurrentSession) {
    var session = CurrentSession.session;

    $scope.initialize = function(){
      $scope.user = session.user;
      $scope.title = session.appName;
      // $scope.sideMenu = 'Menu';
      $scope.fullname = (session.user) ? session.user.full_name : '';
      $scope.showSearch = false;
      $scope.searchData = { criteria: ""};
      $scope.setPromos();
    };

    $scope.setPromos = function() {
      if ( $stateParams.promos === null ) {
        if (typeof session.promos === "undefined") {
          $rootScope.loadingPromos = false;
          $scope.getPromos();
        }else{
          $scope.promos = session.promos;
          ensureFavorites();
        }
      } else {
        $scope.promos = $stateParams.promos;
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
          }, function(error){
            console.log("An error happened matching Promos");
          });
      }
    };

    $scope.showPromo = function () {
      $state.go('home.promo', { promo: this.promo } );
    };

    $scope.clickSearch =  function clickSearch(){
      if($scope.searchData.criteria.length == 0){
        $scope.showSearch = !$scope.showSearch;
      }else{
        $scope.search($scope.searchData.criteria);
      }
    };

    $scope.search = function search(criteria){
      Promo.search(criteria)
        .then(function(promos){
          $state.go('home.main', { promos: promos } );
        }, function(error){
          console.log("An error happened matching the Promos");
          console.log(error);
        });
    };

    $scope.initialize();

    function ensureFavorites(){
      var liked_place_ids = []; 
      angular.forEach($scope.promos, function(promo) {
        if(liked_place_ids.indexOf(promo.place.id) != -1){ promo.place.liked_by_user = true; }
        if(promo.place.liked_by_user){ liked_place_ids.push(promo.place.id); }
      });
    }

  });
