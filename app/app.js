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
    // return this.store.find('collection', params.user);
    return $.getJSON("http://bgg-json.azurewebsites.net/collection/" + params.user);
  }
});

// UserCollectionModel

App.CollectionModel = DS.Model.extend({
  name        : DS.attr(),
  rating      : DS.attr(),
  minPlayers  : DS.attr(),
  maxPlayers  : DS.attr()
});

// UserCollectionSerializer

App.CollectionSerializer = DS.RESTSerializer.extend({
  primaryKey: 'gameId',
  serialize: function(snapshot, options){
    console.log(snapshot);
    return { collection: snapshot[0] };
  }
});

// UserCollectionAdapter

App.CollectionAdapter = DS.RESTAdapter.extend({
  host: 'http://bgg-json.azurewebsites.net',
  pathForType: function(type) { return 'collection'; }
});

// Controllers

App.UserCollectionController = Ember.Controller.extend({
  user: '',

  actions: {
    query: function() {
      this.store.find('collection', this.user).then(function(data){
        console.log(data);
      });
    }
  }
});