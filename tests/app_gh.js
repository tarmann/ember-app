window.App = Ember.Application.create();

// Routers
// ==================================================================

App.Router.reopen({
  location: 'hash'
});

App.IndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('contributors');
  }
});

// Contributors
// ==================================================================

App.ContributorModel = DS.Model.extend({
  name: DS.attr('string')
});

App.ContributorAdapter = DS.RESTAdapter.extend({
  host: 'http://private-0f6a1-ember37.apiary-mock.com'
});

// https://www.youtube.com/watch?v=HL2bMjndviE
App.ContributorSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(payload){
    var idPayload = payload.map(function(item){
      return {
        id: item.id,
        name: item.name
      };
    });
    var result = { contributors: idPayload };

    console.log('normalizePayload', result);

    return result;
  }
});

App.IndexController = Ember.Controller.extend({
  init: function(){
    var self = this;

    self.store.push('contributors', {
      id: Math.random(),
      name: "I'm new!"
    });

    setInterval(function(){
      console.log(self.model);
    }, 2000);
  }
});