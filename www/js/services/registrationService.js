'use strict';
angular.module('rewardnersServices')
.factory('RegistrationService', function(ApiResource, User) {
  return {

    register: function(params) {
      var register_params = angular.copy(params);
      register_params.signup_type = "default_user";

      return ApiResource.create( { resource: 'users'}, { user: register_params } );
    }
  };
});
