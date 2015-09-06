'use strict';

angular.module('rewardnersServices')
.factory('Role', function(ApiResource, $q, BaseModel) {
  var resource = "roles";
  var resource_singular = "role";

  var Role = BaseModel.extend({
    $constructor: function Role(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    }

  });

  Role.metadata = function() {
    return {
      resource: resource,
      resource_singular: resource_singular
    };
  };

  Role.all = function(userId) {
    return Role.listByAction();
  };

  Role.listByAction = function listByAction(action, extra_params){
    extra_params = typeof extra_params !== 'undefined' ? extra_params : {};
    var resourceParams = {resource: resource, method: action}; 
    angular.extend(resourceParams, extra_params);

    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index(resourceParams, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        BaseModel.loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };



  return Role;
});
