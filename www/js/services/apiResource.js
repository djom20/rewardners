'use strict';

angular.module('rewardnersServices')
.factory('ApiResource', function($resource, CurrentSession) {
  var transformBase = function(custom_headers){
    return function(data, headers) {
      headers = angular.extend(headers(), custom_headers);
      data = data || {};
      if(CurrentSession.session.isAuthenticated()){
        data.token_info = {
          'X-User-Token': CurrentSession.session.authentication_token
        };
      }
      return(JSON.stringify(data));
    }
  };

  return $resource (
    CurrentSession.session.resourceUrl(),
    // 'http://localhost:3000/api/:resource/:id/:method',
    // $rootScope.baseUrl + ':resource',
    {},
    {
      'index': {method: 'GET', transformRequest: transformBase()},
      'show': {method: 'GET', transformRequest: transformBase()},
      'create': {method: 'POST', transformRequest: transformBase()},
      'update': {method: 'PUT', transformRequest: transformBase()},
      'delete': {method: 'DELETE', transformRequest: transformBase()}
    }
  );
});