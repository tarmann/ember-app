window.App = Ember.Application.create();

// Router

App.Router.map(function() {

  this.route('timer')

  this.resource('user', function() {
    this.route('collection', { path: ':user' })
  });
});

App.Router.reopen({
  location: 'hash'
});

App.TimerRoute = Ember.Route.extend({
  model: function(){
    return [{ seconds: 3 }, { seconds: 20 }, { seconds: 40 }]
  }
});

App.UserCollectionRoute = Ember.Route.extend({
  model: function(params) {
    return $.getJSON("http://bgg-json.azurewebsites.net/collection/" + params.user);
    // return this.store.find('collection', params.user);
  }
});

// UserCollectionModel

App.CollectionModel = DS.Model.extend();

// UserCollectionAdapter

App.CollectionAdapter = DS.RESTAdapter.extend({
  host: 'http://bgg-json.azurewebsites.net'
  // host: 'http://private-0f6a1-ember37.apiary-mock.com'
  , pathForType: function(type) { return 'collection'; }
});

// UserCollectionSerializer

App.CollectionSerializer = DS.RESTSerializer.extend({});

// Controllers

App.IndexController = Ember.Controller.extend({
  actions: {
    go: function() {
      this.transitionToRoute('/user/' + this.user)
    },
    query: function() {
      this.store.find('collection', 'tarmann').then(function(data){
        console.log(data);
      });
    }
  }
});

App.UserCollectionController = Ember.Controller.extend({
  actions: {
    query: function() {
      this.store.find('collection', this.user).then(function(data){
        console.log(data);
      });
    }
  }
});

// Component

App.UserProfileComponent = Ember.Component.extend({
  actions: {
    sayHi: function() {
      alert('Hello ' + this.username);
    }
  }
});