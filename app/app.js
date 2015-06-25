window.App = Ember.Application.create({
  LOG_RESOLVER: true
});

// Routers
// ==================================================================

App.Router.map(function() {

  this.route('timer');

  this.resource('user', function() {
    this.route('collection', { path: ':user' });
  });
});

App.Router.reopen({
  location: 'hash'
});

App.TimerRoute = Ember.Route.extend({
  model: function(){
    return [{ seconds: 3 }, { seconds: 20 }, { seconds: 40 }];
  }
});

App.UserCollectionRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('collection', params.user);
  }
});

// Collection
// ==================================================================

App.CollectionModel = DS.Model.extend({
  name: DS.attr('string'),
  thumbnail: DS.attr('string')
});

// App.CollectionAdapter = DS.RESTAdapter.extend({
//   host: 'http://private-0f6a1-ember37.apiary-mock.com'
//   , pathForType: function(type) { return 'games'; }
// });

App.CollectionAdapter = DS.RESTAdapter.extend({
  host: 'http://bgg-json.azurewebsites.net',
  pathForType: function(type) { return 'collection'; }
});

App.CollectionSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload){
    var idPayload = payload.map(function(item){
      return {
        id: item.gameId,
        thumbnail: item.thumbnail,
        name: item.name
      };
    });
    var result = { collections: idPayload };
    console.log(result);
    return result;
  }
});


// Controllers
// ==================================================================

App.IndexController = Ember.Controller.extend({
  actions: {
    go: function() {
      this.transitionToRoute('/user/' + this.user);
    },
    query: function() {
      this.store.find('collection', 'tarmann');
    }
  }
});

App.UserCollectionController = Ember.Controller.extend({
  init: function(){
    this.store.push('collection', { name: "Added from controller" });
  },

  actions: {
    query: function() {}
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