'use strict';
angular.module('rewardnersServices')
.factory('LoginService', function($rootScope, ApiResource, CurrentSession) {
  return {

    login: function(params) {
      params.secret_key =  CurrentSession.session.secret_key;
      params.signup_type = "default_user";
      return ApiResource.create( { resource: 'sessions'}, { user: params } );
    },

    loginAsBusiness: function(params) {
      params.secret_key =  CurrentSession.session.secret_key;
      params.signup_type = "business";
      return ApiResource.create( { resource: 'sessions'}, { user: params } );
    },

    // TODO  check this fucntionallity
    resetPassword: function(params) {
      return ApiResource.update ( { resource: 'passwords' }, params);
    }
  };
});
