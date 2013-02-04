Failboat.Views.TasksIndex = Backbone.View.extend({
  id: 'main',

  // model: Failboat.Models.Task,

  template: JST['tasks/index'],

  events: {
    'submit #new_task': 'createNewTask'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    // this.collection.on('reset', this.render, this);
    // this.collection.on('add', this.render, this);
    // this.collection.on('change', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template);
    this.collection.each(this.appendTask);
    console.log('we are hitting this');
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
