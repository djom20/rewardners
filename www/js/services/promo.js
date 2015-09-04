'use strict';

angular.module('rewardnersServices')
.factory('Promo', function(ApiResource, $q, BaseModel) {
  var resource = "promos";
  var resource_singular = "promo";
  var bannerUrl; 

  var Promo = BaseModel.extend({
    $constructor: function Promo(properties) {
      this.$initialize.apply(this, arguments);
      this.published = true;
    },
    defaultOptions: function() {
      return {};
    },

    getBannerUrl: function getBannerUrl(){

      if (this.bannerUrl === undefined) {
        this.bannerUrl = "/img/promo_default.png";
        if(!(this.banner_medium.indexOf("promo_default.png") > -1)){
          this.bannerUrl = this.banner_medium;
        }
      }
      return this.bannerUrl;
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
    return Promo.listByAction("trendings");
  };

  Promo.taken = function() {
    return Promo.listByAction("taken");
  };

  Promo.favorites = function() {
    return Promo.listByAction("favorites");
  }; 

  Promo.byPlace = function(placeId) {
    return Promo.listByAction("by_place", {place_id: placeId});
  };

  Promo.listByAction = function listByAction(action, extra_params){
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



  return Promo;
});
