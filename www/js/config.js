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
        inactivityLimit: 1795,    // seconds
        secret_key: '7efbdd96fe6709bba8642b697f9d5e52'
      },
      resourceUrl: function() {
        return this.api.protocol + "://" + this.api.server + '/api/v1/:resource/:id/:method'
      },
      
    });
    return this;
  });