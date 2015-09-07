'use strict';

angular.module('rewardners')
  .controller('PromoNewController', function($rootScope, $scope, $state, $stateParams, 
      $ionicPopup, 
      Promo, Role, CurrentSession, $dateFormat) {
    var session = CurrentSession.session;

    $scope.user = session.user;
    $scope.title = session.appName;
    //.:: ::.

    $scope.initialize = function(){
      $scope.setPlace();
      $scope.setRoles();
      $scope.promo = new Promo({place_id: $scope.place.id })
      setDatePickerOptions();
    };

    $scope.submit = function () {
      $scope.promo.save().then(function(promoSaved){
        var successPopup = $ionicPopup.alert({
          title: 'New coupon created'
        });
        successPopup.then(function(){
          $state.go('home.place', { place: $scope.place } );
        });
      }, function (data) {
        console.log('Promo creation Error: ' + JSON.stringify(data));
        $ionicPopup.alert({
          title: 'Coupon creation Error',
          template: 'We had an error Creating your Coupon. Please verify all information and try again.'
        });
      })
    };

    $scope.setPlace =  function() {
      $scope.place = $stateParams.place;
    };

    $scope.setRoles =  function() {
      if( session.roles === undefined ) {
        Role.all().then(function(roles){
          session.roles = roles;
          $scope.roles = session.roles;
        }, function(error){
          console.log('got an error from the API');
          console.log(error);
        });
      } else {
        $scope.roles = session.roles;
      }
    };

    $scope.initialize();

    function setDatePickerOptions(){
      var startAtOption = {
        titleLabel: "Coupon initial Date",
        from: new Date(),
        callback: function(val){
          $scope.promo.start_at = $dateFormat.dateFormat(val, "dd-mm-yyyy");
        }
      };
      var endAtOption = {
        titleLabel: "Coupon final Date",
        from: new Date(),
        callback: function(val){
          $scope.promo.end_at =   $dateFormat.dateFormat(val, "dd-mm-yyyy");
        }
      };
      $scope.startAtDatePicker = angular.extend(startAtOption, $rootScope.defaultDatePickerOptions);
      $scope.endAtDatePicker = angular.extend(endAtOption, $rootScope.defaultDatePickerOptions);
    }

  });