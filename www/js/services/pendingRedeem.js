'use strict';

angular.module('rewardnersServices')
.factory('PendingRedeem', function(ApiResource, $q, BaseModel) {
  var resource = "redeems";
  var resource_singular = "redeem";
  var NESTED_MODELS = {};

  var PendingRedeem = BaseModel.extend({
    $constructor: function PendingRedeem(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    }

  });

  PendingRedeem.metadata = function() {
      return {
        resource: resource,
        resource_singular: resource_singular,
        nested_models: NESTED_MODELS
      };
  };

  PendingRedeem.pending = function(userSearchCode) {
    return PendingRedeem.listByAction("pending", {user_search_code: userSearchCode});
  };

  PendingRedeem.listByAction = function listByAction(action, extra_params){
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



  return PendingRedeem;
});
