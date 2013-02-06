Failboat.Views.TasksIndex = Backbone.View.extend({
  id: 'main',

  // model: Failboat.Models.Task,

  template: JST['tasks/index'],

  events: {
    'submit #new_task': 'createNewTask',
    'click #log_out': 'signOut'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    // this.listenTo(this.collection, 'change', this.render);
    // this.listenTo(this.collection, 'add', this.render);
    // this.listenTo(this.collection, 'reset', this.render);
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.render, this);
    this.collection.on('change', this.render, this);
    this.model.on('change', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({user: Failboat.currentUser}));
    this.collection.each(this.appendTask);
    $('#remaining').append(this.collection.remainingTasks().length);
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
  },

  signOut: function(event) {
    event.preventDefault();
    $.removeCookie('user_id');
    $.removeCookie('remember_token');
    Failboat.currentUser = null;
    Failboat.appRouter.navigate('log_in', true);
  }


});
