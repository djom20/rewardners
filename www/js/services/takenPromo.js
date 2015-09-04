'use strict';

angular.module('rewardnersServices')
.factory('TakenPromo', function(ApiResource, $q, BaseModel, Promo) {
  var resource = "taken_promos";
  var resource_singular = "taken_promo";
  var bannerUrl; 
  var NESTED_MODELS = {promo: Promo};

  var TakenPromo = BaseModel.extend({
    $constructor: function TakenPromo(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    },

    approved: function(){
      return !(angular.isUndefined(this.approved_at) || this.approved_at === null) ;
    },

    rejected: function(){
      return !(angular.isUndefined(this.rejected_at) || this.rejected_at === null) ;
    },

    pending: function(){
      return !(this.approved() || this.rejected());
    },

    resolve: function resolve(accepted){
      var _deferred = $q.defer();
      var self = this;
      var deferred = ApiResource.create({resource: resource, id: this.id, 
        accepted: accepted, method: "resolve"}, this.defaultOptions() );
      deferred.$promise.then(
        function(data){
          self.approved_at = data.taken_promos[0].approved_at;
          self.rejected_at = data.taken_promos[0].rejected_at;
          _deferred.resolve(self);
        }, function(error){
          _deferred.reject({status: error.status, message: error.statusText});
        });
      return _deferred;
    }

  });

  TakenPromo.metadata = function() {
    return {
      resource: resource,
      resource_singular: resource_singular,
      nested_models: NESTED_MODELS
    };
  };

  TakenPromo.pendingApproval = function(userId) {
    return TakenPromo.listByAction("pending_approval");
  };

  TakenPromo.listByAction = function listByAction(action, extra_params){
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



  return TakenPromo;
});
