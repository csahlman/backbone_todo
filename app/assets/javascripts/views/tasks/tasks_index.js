Failboat.Views.TasksIndex = Backbone.View.extend({

  tagName: 'span',
  id: 'main',

  // model: Failboat.Models.Task,

  template: JST['tasks/index'],

  events: {
    // 'click .done': 'toggleDone'
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    // this.listenTo(this.model, 'change', this.render);
    // this.collection.on('destroy', this.remove);
  },

  render: function() {
    $(this.el).html(this.template);
    this.collection.each(this.appendTask);
    return this;
  },

  appendTask: function(task) {
    view = new Failboat.Views.Task({model: task});
    if (task.isFinished()) {
      $('#finished').append(view.render().el);
    } else {
      $('#tasks').append(view.render().el);
    }
  }


});
