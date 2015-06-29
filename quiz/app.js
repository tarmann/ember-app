window.App = Ember.Application.create({});

App.Router.reopen({
  location: 'hash'
});

App.Router.map(function() {
  this.route('questions');
  this.route('question', { path: '/question/:question_id' });
});

App.QuestionsRoute = Ember.Route.extend({
  model: function() {
    return QUIZ_FIXTURES.questions;
  }
});

App.QuestionRoute = Ember.Route.extend({
  model: function(params) {
    return QUIZ_FIXTURES.questions.filter(function(item){
      return params.question_id == item.id;
    })[0];
  }
});

App.QuestionModel = DS.Model.extend({});

App.QuestionsController = Ember.Controller.extend({
  logModel: function(){
    console.log(this.model);
  }.on('init')
});

App.QuestionController = Ember.Controller.extend({
  prevQuestion: function(){
    var questionId = parseInt(this.get('model.id')) - 1;
    return '#/question/'+ questionId;
  }.property('model.id'),
  nextQuestion: function(){
    var questionId = parseInt(this.get('model.id')) + 1;
    return '#/question/'+ questionId;
  }.property('model.id')
});

App.QuestionViewerComponent = Ember.Component.extend({
  fillStyle: function(){
    return 'background-color:'+this.get('question.description');
  }.property('question.description')
});