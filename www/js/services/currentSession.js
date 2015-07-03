'use strict';

angular.module('rewarnersServices')
    .factory('CurrentSession', function($rootScope, $location, Configuration, Session) {
        var session = this.session || new Session();

        function getSession() {
          // extend current session with any configuration requirements
          angular.extend(session, Configuration);
          return session;
        }

        function logout(){
          console.log('login out');
          session.clearSession();
          $location.path('/login/main');
        }

        return {
          session: getSession(),
          logout: logout
        };
    });
