'use strict';

angular.module('rewardnersServices')
.factory('Redeem', function(ApiResource, $q, BaseModel, Place, User) {
  var resource = "redeems";
  var resource_singular = "redeem";
  var NESTED_MODELS = {place: Place, user: User};

  var Redeem = BaseModel.extend({
    $constructor: function Redeem(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    }

  });

  Redeem.metadata = function() {
      return {
        resource: resource,
        resource_singular: resource_singular,
        nested_models: NESTED_MODELS
      };
  };


  // Redeem.listByAction = function listByAction(action, extra_params){
  //   extra_params = typeof extra_params !== 'undefined' ? extra_params : {};
  //   var resourceParams = {resource: resource, method: action}; 
  //   angular.extend(resourceParams, extra_params);

  //   var model = this;
  //   var modelInstance = new model();
  //   var _deferred = $q.defer();
  //   var deferred = ApiResource.index(resourceParams, modelInstance.defaultOptions() );
  //   deferred.$promise.then(
  //     function(data){
  //       BaseModel.loadModel(model, data, _deferred);
  //     }, function(error){
  //       _deferred.reject({status: error.status, message: error.statusText})
  //     }
  //   );
  //   return _deferred.promise;
  // };



  return Redeem;
});
