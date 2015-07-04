'use strict';

angular.module('rewardnersServices')
  .factory('Session', function() {
    return function (session) {
      angular.extend(this, {
        auth: {},
        security_token: null,
        member: null,

        hasStorage: function() {
          return 'localStorage' in window && window['localStorage'] !== null;
        },
        getItem: function(key) {
          return (this.hasStorage()) ?
            localStorage.getItem(key) : null
        },
        setItem: function(key, value) {
          if (this.hasStorage) {
            localStorage.setItem(key, value);
          }
        },
        // functions
        isAuthenticated: function () {
         // console.log('Auth check\nState: ' + this.auth.state + ' Token: ' + this.security_token + ' Member: ' + this.member);
          // make sure we set the state to correct flag and have security token and member is an object
          return (this.auth.state == 'logged_in' &&  this.security_token && this.member);
        },
        clearSession: function () {
          this.auth = {};
          this.security_token = null;
          this.member = null;
        }
      });
      angular.extend(this, session);
  }
});
