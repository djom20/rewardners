'use strict';

angular.module('rewardnersServices')
    .factory('Session', function() {
    return function (session) {
      angular.extend(this, {
        auth: {},
        authentication_token: null,
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
          // make sure we set the state to correct flag and have security token and member is an object
          return (this.auth.state == 'logged_in' &&  this.authentication_token && this.member);
        },
        clearSession: function () {
          this.auth = {};
          this.authentication_token = null;
          this.member = null;
        }
      });
      angular.extend(this, session);
    }
  });