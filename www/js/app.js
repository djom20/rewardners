'use strict';

angular.module('rewardners', ['ionic', 'ui.router',
  'rewardnersServices', 'ionic.utils',
  'ngCordova'])

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
      url: '/main',
      views: {
        'content': {
          templateUrl: 'views/home-main.html',
          controller: 'HomeController'
        }
      },
      data: {
        authentication: true
      }
    })

    .state('test', {
      url: '/test',
      templateUrl: 'views/intro.html',
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
  });
});

// define the module
angular.module('rewardnersServices', ['ngResource']);

