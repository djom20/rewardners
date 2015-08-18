'use strict';
angular.module('rewardnersServices')
.factory('RegistrationService', function(ApiResource, User) {
  return {

    register: function(params) {
      var register_params = {
        city: params["city"],

        email: params["email"],
        zipcode: params["zipcode"],
        password: params["password"],
        password_confirmation: params["password_confirmation"],
        terms: params["terms"],

        name: params["name"],
        last_name: params["last_name"],

        signup_type: "default_user"

      };
      return ApiResource.create( { resource: 'users'}, { user: register_params } );
    }
  };
});
