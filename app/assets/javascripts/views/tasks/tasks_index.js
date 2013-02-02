Failboat.Views.TasksIndex = Backbone.View.extend({

  tagName: 'span',
  id: 'main',

  // model: Failboat.Models.Task,

  template: JST['tasks/index'],

  events: {
    'submit #new_task': 'createNewTask'
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.render, this);
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
  },

  createNewTask: function(event) {
    event.preventDefault();
    this.collection.create({name: $('#new_task_name').val(), done: false }, {
      wait: true,
      success: function() {
        $('#new_task')[0].reset();
      },
      error: function() {
        alert('error');
      }
    });
  }


});
