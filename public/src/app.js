window.App = Ember.Application.create();

// Router

App.Router.map(function() {
  this.resource('user', function() {
    this.route('collection', { path: ':user' })
  });
});

App.Router.reopen({
  location: 'hash'
});

App.UserCollectionRoute = Ember.Route.extend({
  model: function(params) {
    // return this.store.find('UserCollection', params.user);
    return $.getJSON("http://bgg-json.azurewebsites.net/collection/" + params.user);
  }
});

// UserCollectionModel

App.UserCollectionModel = DS.Model.extend({
  name        : DS.attr(),
  rating      : DS.attr(),
  minPlayers  : DS.attr(),
  maxPlayers  : DS.attr()
});

// UserCollectionSerializer

App.UserCollectionSerializer = DS.RESTSerializer.extend({
  primaryKey: 'gameId',
  serialize: function(snapshot, options){
    return { collection: snapshot };
  }
});

// UserCollectionAdapter

App.UserCollectionAdapter = DS.RESTAdapter.extend({
  host: 'http://bgg-json.azurewebsites.net',
  pathForType: function(type) {
    return 'collection';
  }
});

// Controllers

App.UserCollectionController = Ember.Controller.extend({
  user: '',

  actions: {
    query: function() {
      console.log(this.model);
      this.store.find('UserCollection', this.user);
    }
  }
});