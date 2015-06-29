window.App = Ember.Application.create({});

// ROUTES
// =====================================================================

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
  setupController: function(controller, model) {
    controller.setProperties({
      model: model,
      questions: QUIZ_FIXTURES.questions
    });
  },
  model: function(params) {
    return QUIZ_FIXTURES.questions.filter(function(item){
      return params.question_id == item.id;
    })[0] || null;
  }
});

// MODELS
// =====================================================================

App.QuestionModel = DS.Model.extend();

// CONTROLLERS
// =====================================================================

App.QuestionsController = Ember.ArrayController.extend();

App.QuestionController = Ember.Controller.extend({
  actions: {
    saveAnswer: function(weight){
      console.log({ id: this.get('model.id'), weight: weight });
    }
  }
});

// COMPONENTS
// =====================================================================

App.QuestionNavComponent = Ember.Component.extend({
  totalQuestions: function(){
    var questions = this.get('questions');
    return questions.length;
  }.property(),
  currentQuestion: function(id){
    return this.get('model.id');
  }.property('model.id'),
  questionLink: function(delta){
    var questionId = parseInt(this.get('model.id')) + delta;
    return (questionId) ? '#/question/'+ questionId : '';
  },
  prevQuestionLink: function(){
    return this.questionLink(-1);
  }.property('model.id'),
  nextQuestionLink: function(){
    return this.questionLink(+1);
  }.property('model.id')
});

App.QuestionViewerComponent = Ember.Component.extend({
  actions: {
    answer: function(weight){
      this.sendAction('onAnswer', weight);
    }
  },
  fillStyle: function(){
    return 'background-color:'+this.get('question.description');
  }.property('question.description')
});