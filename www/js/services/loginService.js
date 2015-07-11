'use strict';
angular.module('nicuServices')
.factory('LoginService', function($rootScope, ApiResource, CurrentSession) {
  return {

    login: function(params) {
      params.secret_key =  CurrentSession.session.secret_key;
      return ApiResource.save( { rsrc: 'sessions'}, { user: params } );
    },

    // TODO  check this fucntionallity
    resetPassword: function(params) {
      return ApiResource.update ( { rsrc: 'passwords' }, params);
    }
  };
});
