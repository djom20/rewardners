'use strict';

angular.module('rewardnersServices')
.factory('BaseModel', function(ApiResource, $q) {
  var resource = "base_models";
  var resource_singular= "base_model";
  var NESTED_MODELS = {}
  var DEFAULT_CUSTOM_OBJECTS = [];

  

  var BaseModel = function BaseModel(properties, options) {
    this.$initialize.apply(this, arguments);
  };

  BaseModel.prototype = {

    $initialize: function (properties) {
      angular.extend(this, properties, {previousAttributes: {}});
      DEFAULT_CUSTOM_OBJECTS.push(this.CUSTOM_OBJECTS)
    },

    isNew: function () {
      return this.id == null;
    },

    $changedAttributes: function () {
      var current = this;
      var changed = {};

      for (var property in current) {
        var value = current[property];
        if (typeof value !== 'function' && property != 'previousAttributes'
          && (DEFAULT_CUSTOM_OBJECTS.indexOf(property) < 0)) {

          if (value && value instanceof Object && !(value instanceof Array)) {
            var nestedModel = NESTED_MODELS[property];
            if (nestedModel) {
              var nestedModelObject = null;
              if (value.id == undefined) {
                nestedModelObject = new nestedModel(value, false);
              }
              else {
                nestedModelObject = new nestedModel(value, true);
              }
              changed[property + "_attributes"] = nestedModelObject.$changedAttributes();
            }
            else {
              changed[property + "_attributes"] = value.$changedAttributes();
            }
          }
          else {
            if (angular.equals(value, this.previousAttributes[property]) === false) {
              changed[property] = value;
            }
          }
        }
      }

      delete changed.CUSTOM_OBJECTS;
      return changed;
    },

    save: function () {
      var current = this,
        _deferred = $q.defer(),
        data = current.$changedAttributes(),
        deferred;

      if (this.isNew()) {
        var resource_data = {};
        resource_data[resource_singular] = data;
        deferred = ApiResource.create({resource: resource}, resource_data);
      } else {
        deferred = ApiResource.update({resource: resource, id: current.id}, {user: data});
      }
      deferred.$promise.then(
        function(response){
          var _data = getAttributes(response[resource_singular]);
          angular.extend(current, _data)
          angular.copy(_data, current.previousAttributes);
          _deferred.resolve(current);
        },
        function(error){
          _deferred.reject({status: error.status, message: error.statusText});
        });

      return _deferred.promise;
    },

    fetch: function () {
      var current = this,
        _deferred = $q.defer(),
        deferred = ApiResource.show({resource: resource, id: current.id}, current.defaultOptions());

      deferred.$promise.then(
        function (data) {
          var _data = getAttributes(data[resource_singular]);
          angular.extend(current, _data);
          angular.copy(_data, current.previousAttributes);
          _deferred.resolve(current);
        },
        function (error) {
          _deferred.reject({status: error.status, message: error.statusText})
        });

      return _deferred.promise;
    }
  };

  BaseModel.find = function(id){
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.show({resource: resource, id: id}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        loadModel(model, data, _deferred);
      },
      function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };

  BaseModel.extend = function(protoProps) {
    var parent = this;
    var child;

    child = protoProps.$constructor;
    angular.extend(child, parent);

    var Surrogate = function () { this.$constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    angular.extend(child.prototype, protoProps);
    child.__super__ = parent.prototype;
    return child;
  };

  BaseModel.instanceModel = function(ModelType, _instance_attrs_){
    var instance = new ModelType(_instance_attrs_);
    angular.copy(instance, instance.previousAttributes);
    return instance;
  };

  BaseModel.loadModel = function(model, data, deferred){
    var ModelType = model;
    resource = ModelType.metadata().resource;
    if (angular.isArray(data[resource]) && (resource in data)) {
      var model_intances = [];
      angular.forEach(data[resource], function (raw_instance_attrs) {
        model_intances.push(BaseModel.instanceModel(ModelType, BaseModel.getAttributes(raw_instance_attrs, ModelType)));
      });
      deferred.resolve(model_intances)
    }
    else {
      var model_instance = BaseModel.instanceModel(ModelType, BaseModel.getAttributes(data[data[resource]], ModelType));
      deferred.resolve(model_instance);
    }
  };

  BaseModel.getAttributes = function(attributes, ModelType){
    var _data = {};
    for (var property in attributes){
      var value = attributes[property];
      if (value instanceof Object) {
        var nested_models = ModelType.metadata().nested_models;
        if (typeof nested_models !== 'undefined'){
          var nestedModel = nested_models[property];
          if (nestedModel) {
            if (value instanceof Array){
              _data[property] = [];
              for (var index = 0; index < value.length; index++){
                _data[property].push(new nestedModel(value[index], true))
              }
            }else{
              _data[property] = new nestedModel(value, true)
            }
          }
        }
      }else{
        _data[property] = value;
      }
    }
    return _data;
  };
  
  return BaseModel;
});
