var ANIMALS = {
  "3": {
    id: 3,
    type: 'cat',
    name: 'Bubbles',
    age: '10 months',
    src: 'http://i.imgur.com/O2WhkzI.jpg'
  },
  "42": {
    id: 42,
    type: 'cat',
    name: 'Bob',
    age: '1 year',
    src: 'http://i.imgur.com/WWoJbLK.jpg'
  },
  "25": {
    id: 25,
    type: 'dog',
    name: 'Michiko',
    age: '3 years',
    src: 'http://i.imgur.com/O2WhkzI.jpg'
  },
  "2": {
    id: 42,
    type: 'dog',
    name: 'Bob',
    age: '1 year',
    src: 'http://i.imgur.com/WWoJbLK.jpg'
  }
};

var server = new Pretender(function() {
  this.get('/animals', function(request) {
    console.log('here');
    var animals = Object.keys(ANIMALS).map(function(k) {
      return ANIMALS[k];
    });
    var all =  JSON.stringify(animals);
    return [200, {"Content-Type": "application/json"}, all];
  });

  this.get('/animals/:id', function(request) {
    var animal = JSON.stringify(ANIMALS[request.params.id]);
    return [200, {"Content-Type": "application/json"}, animal];
  });
});

App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 13
});

App.Router.reopen({
  url: 'localhost:8000/#/8'
});

DS.RESTAdapter.reopen({
  host: 'localhost:8000',
  namespace: 'v3'
});

App.Router.map(function() {
  this.route('cats');
  this.route('dogs');
});

App.Animal = DS.Model.extend({
  type: DS.attr('string'),
  name: DS.attr('string'),
  age: DS.attr('string'),
  src: DS.attr('string')
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('animal');
  }
});

App.CatsRoute = Ember.Route.extend({
  model: function() {
    // return this.get('store').find('animal').filterBy('type','cat');
  }
});

App.DogsRoute = Ember.Route.extend({
  model: function() {
    // return this.get('store').find('animal').filterBy('type','dog');
  }
});