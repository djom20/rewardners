'use strict';

// Configutation options for the application
// Please add any global configuration parameters for here
angular.module('rewardners').
  factory('Configuration', function() {
    angular.extend(this, {
      appName: 'Rewardners',
      api: {
        protocol: 'http',
        server: 'localhost:3000',
        inactivityLimit: 1795     // seconds
      },
      loginUrl: function() {
        return this.api.protocol + "://" + this.api.server + '/api/:rsrc';
      },
      resourceUrl: function() {
        return this.api.protocol + "://" + this.api.server + '/api/:resource/:id/:method'
      },
      serverUri: function() {
        return this.api.protocol + '://' + this.api.server;
      }
    });
    return this;
  });
