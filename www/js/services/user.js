'use strict';

angular.module('rewardnersServices')
.factory('User', function(ApiResource, $q, Promo, BaseModel) {
  var resource = "users";
  var resource_singular = "user";
  var NESTED_MODELS = {promos: Promo}
  var DEFAULT_CUSTOM_OBJECTS = ['fullname'];

  var User = BaseModel.extend({
    $constructor: function User(properties) {
      this.$initialize.apply(this, arguments);
    },

    save: function () {
      var current = this,
        _deferred = $q.defer(),
        data = current.$changedAttributes(),
        deferred;

      if (this.isNew()) {
        deferred = ApiResource.create({resource: resource}, {user: data});
      } else {
        deferred = ApiResource.update({resource: resource, id: current.id}, {user: data});
      }
      deferred.$promise.then(
        function(response){
          var _data = getAttributes(response.user);
          angular.extend(current, _data)
          delete current["password"];
          angular.copy(_data, current.previousAttributes);
          delete current.previousAttributes["password"];
          _deferred.resolve(current);
        },
        function(error){
          _deferred.reject({status: error.status, message: error.statusText});
        });

      return _deferred.promise;
    },

    updatePassword: function (password) {
      this.password = password;
      return this.save();
    },

    get fullname() {
      var fullname = '';
      if (this.first_name) {
        fullname += this.first_name + " ";
      }
      if (this.last_name) {
        fullname += this.last_name + " ";
      }
      return fullname;
    }

  });

  return User;
});
