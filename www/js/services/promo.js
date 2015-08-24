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
    },

    getBannerUrl: function getBannerUrl(){
      var bannerUrl = "/img/empty-image.png";
      if(!(this.image_medium.indexOf("empty-image.png") > -1)){
        bannerUrl = this.image_medium;
      }
      return bannerUrl;
    },

    taken: function taken(){
      return this.promo_code !== undefined;
    },

    take: function take(){
      var _deferred = $q.defer();
      var self = this;
      var deferred = ApiResource.create({resource: resource, id: this.id, method: "take"},
        this.defaultOptions() );
      deferred.$promise.then(
        function(data){
          self.promo_code = data.promos[1].promo_code;
          _deferred.resolve(self);
        }, function(error){
          _deferred.reject({status: error.status, message: error.statusText});
        });
    }
  });

  Promo.metadata = function() {
      return {
        resource: resource,
        resource_singular: resource_singular
      };
  };

  Promo.trendings = function() {
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index({resource: resource, method: "trendings"}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        BaseModel.loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };

  Promo.taken = function() {
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index({resource: resource, method: "taken"}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        BaseModel.loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };



  return Promo;
});
