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
  minPlayers  : DS.attr(),
  maxPlayers  : DS.attr(),
  isExpansion : DS.attr(),
  owned       : DS.attr(),
  rating      : DS.attr()
});

// UserCollectionAdapter

App.CollectionAdapter = DS.RESTAdapter.extend({
  // host: 'http://bgg-json.azurewebsites.net',
  host: 'http://private-0f6a1-ember37.apiary-mock.com',
  pathForType: function(type) { return 'collection'; }
});

// UserCollectionSerializer

App.CollectionSerializer = DS.RESTSerializer.extend({
  primaryKey: 'gameId'
  , serialize: function(snapshot, options){
    console.log('snapshot', snapshot);
    return { collections: snapshot };
  }
});

// Controllers

App.IndexController = Ember.Controller.extend({
  actions: {
    go: function() {
      this.transitionToRoute('/user/' + this.user)
    }
  }
});

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