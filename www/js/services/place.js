'use strict';

angular.module('rewardnersServices')
.factory('Place', function(ApiResource, $q, BaseModel) {
  var resource = "Places";
  var resource_singular = "Place";

  var Place = BaseModel.extend({
    $constructor: function Place(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    },

    getBannerUrl: function getBannerUrl(){
      var bannerUrl = "/img/place.png";
      if(!(this.image_medium.indexOf("empty-image.png") > -1)){
        bannerUrl = this.image_medium;
      }
      return bannerUrl;
    },

  });

  Place.metadata = function() {
      return {
        resource: resource,
        resource_singular: resource_singular
      };
  };

  Place.own = function() {
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index({resource: resource, method: "owned"}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        BaseModel.loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };


  return Place;
});
