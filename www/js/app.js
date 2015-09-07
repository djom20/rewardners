'use strict';

angular.module('rewardners', ['ionic', 'ui.router',
  'rewardnersServices', 'ionic.utils',
  'ngCordova', 'monospaced.qrcode', 'monospaced.elastic',
  'ionic-datepicker'])

.config(function($stateProvider, $urlRouterProvider){
  // default path
  $urlRouterProvider.otherwise('/login');
  // $urlRouterProvider.otherwise('/tab/dash');
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })
    .state('home.main', {
      url: '/promos',
      cache: false,
      views: {
        'content': {
          templateUrl: 'views/promos-index.html',
          controller: 'PromosController'
        }
      },
      data: {
        authentication: true
      }
    })
    .state('home.promo', {
      url: '/promo',
      params: { promo: null },
      views: {
        'content': {
          templateUrl: 'views/promos-show.html',
          controller: 'PromoController'
        }
      },
      data: {
        authentication: true
      }
    })
    .state('home.promo_new', {
      url: '/promo_new',
      params: { place: null },
      views: {
        'content': {
          templateUrl: 'views/promo_new.html',
          controller: 'PromoNewController'
        }
      },
      data: {
        authentication: true
      }
    })

    .state('home.pending_promos', {
      url: '/pending_promos',
      cache: false,
      params: { takenPromos: null },
      views: {
        'content': {
          templateUrl: 'views/pending-promos-index.html',
          controller: 'PendingPromoController'
        }
      },
      data: {
        authentication: true
      }
    })

    .state('home.pending_redeems', {
      url: '/pending_redeems',
      cache: false,
      views: {
        'content': {
          templateUrl: 'views/pending-redeems-index.html',
          controller: 'PendingRedeemsController'
        }
      },
      data: {
        authentication: true
      }
    })
    .state('home.redeem_new', {
      url: '/redeem_new',
      cache: false,
      params: { pendingRedeem: null },
      views: {
        'content': {
          templateUrl: 'views/redeem-new.html',
          controller: 'RedeemNewController'
        }
      },
      data: {
        authentication: true
      }
    })


    .state('home.favorites', {
      url: '/favorites',
      views: {
        'content': {
          templateUrl: 'views/promos-index.html',
          controller: 'FavoritePromosController'
        }
      },
      data: {
        authentication: true
      }
    })

    .state('home.places', {
      url: '/places',
      views: {
        'content': {
          templateUrl: 'views/places-index.html',
          controller: 'PlacesController'
        }
      },
      data: {
        authentication: true
      }
    })

    .state('home.place', {
      url: '/place',
      cache: false,
      params: { place: null },
      views: {
        'content': {
          templateUrl: 'views/places-show.html',
          controller: 'PlaceController'
        }
      },
      data: {
        authentication: true
      }
    })

    .state('test', {
      url: '/test',
      templateUrl: 'views/test.html',
      controller: 'TestController'
    })

    .state('register', {
      url: '/register',
      abstract: true,
      templateUrl: 'views/register.html'
    })
    .state('register.main', {
      url: '/main',
      views: {
        'registration': {
          templateUrl: 'views/register-main.html',
          controller: 'RegistrationController'
        }
      }
    })
    .state('register.success', {
      url: '/success',
      views: {
        'registration': {
          templateUrl: 'views/register-success.html'
        }
      }
    })
    // .state('reset.password', {
    //   url: '/password',
    //   views: {
    //     'login': {
    //       templateUrl: 'views/reset-password.html',
    //       controller: 'ResetPasswordController'
    //     }
    //   }
    // }).
    // state('reset.success', {
    //   url: '/success',
    //   views: {
    //     'login': {
    //       templateUrl: 'views/reset-success.html'
    //     }
    //   }
    // }).
    // state('reset.failure', {
    //   url: '/failure',
    //   views: {
    //     'login': {
    //       templateUrl: 'views/reset-failure.html'
    //     }
    //   }
    // })
    ;
})

.run(function($ionicPlatform, $rootScope, $state, CurrentSession) {
  var session = CurrentSession.session;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // hide the splash screen
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
    }

    // manage state changes
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      if (toState.data && toState.data.authentication && !CurrentSession.session.isAuthenticated()) {
        event.preventDefault();
        // test for authentication
        console.log('redirect to login');
        $state.go('login');
      }
    });

    $rootScope.defaultDatePickerOptions = defaultDatePickerOptions();

  });
});

// define the module
angular.module('rewardnersServices', ['ngResource']);

function defaultDatePickerOptions(){
  return {
      // titleLabel: 'Title',  //Optional
      // todayLabel: 'Today',  //Optional
      // closeLabel: 'Close',  //Optional
      // setLabel: 'Set',  //Optional
      setButtonType : 'button-positive',  //Optional
      todayButtonType : 'button-positive',  //Optional
      closeButtonType : 'button-positive',  //Optional
      // inputDate: new Date(),    //Optional
      // mondayFirst: true,    //Optional
      // disabledDates: disabledDates, //Optional
      // weekDaysList: weekDaysList,   //Optional
      // monthList: monthList, //Optional
      templateType: 'popup', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      // from: new Date(2012, 8, 2),   //Optional
      // to: new Date(2018, 8, 25),    //Optional
      // callback: function (val) {    //Mandatory
      //   datePickerCallback(val);
      // }
    };
}