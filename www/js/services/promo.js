'use strict';

angular.module('rewardnersServices')
.factory('Promo', function(ApiResource, $q, BaseModel) {
  var resource = "promos";
  var resource_singular = "promo";

  var Promo = BaseModel.extend({
    $constructor: function Promo(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    }
  });

  Promo.trendings = function() {
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index({resource: resource, method: "trendings"}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };

  return Promo;
});
