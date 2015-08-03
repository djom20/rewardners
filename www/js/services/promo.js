'use strict';

angular.module('rewardnersServices')
.factory('Promo', function(ApiResource, $q, BaseModel) {
  var resource = "promos";
  var resource_singular = "promo";

  var Promo = BaseModel.extend({
    $constructor: function Promo(properties) {
      this.$initialize.apply(this, arguments);
    }
  });

  return Promo;
});
