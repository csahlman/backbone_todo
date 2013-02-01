Failboat.Views.TasksIndex = Backbone.View.extend({

  tagName: 'span',

  id: 'main',

  template: JST['tasks/index'],

  initialize: function() {
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template);
    this.collection.each(this.appendTask);
    return this;
  },

  appendTask: function(task) {
    view = new Failboat.Views.Task({model: task});
    $('#tasks').append(view.render().el);
  }



});
