'use strict';

angular.module('rewardnersServices')
.factory('ApiResource', function($resource, CurrentSession) {
  var transformBase = function(custom_headers){
    return function(data, headers) {
      headers = angular.extend(headers(), custom_headers);
      data.token_info = {
        'security_token': CurrentSession.session.security_token,
        'person_id': CurrentSession.session.member.id
      };
      return(JSON.stringify(data));
    }
  };

  return $resource (
    CurrentSession.session.resourceUrl(),
   // 'http://localhost:3000/api/:resource/:id/:method',
    // $rootScope.baseUrl + ':resource',
    {},
    {
      'index': {method: 'POST', transformRequest: transformBase()},
      'show': {method: 'POST', transformRequest: transformBase()},
      'create': {method: 'POST', transformRequest: transformBase()},
      'update': {method: 'PUT', transformRequest: transformBase()},
      'delete': {method: 'POST', transformRequest: transformBase()}
    }
  );
});