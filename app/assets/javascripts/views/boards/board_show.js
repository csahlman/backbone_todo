Failboat.Views.BoardShow = Backbone.View.extend({

  template: JST['boards/show_board'],

  events: {
    'submit #new_task': 'createTask'
  },

  initialize: function() {
    this.model.fetch();
    this.model.on('reset', this.render, this);
    // this.model.on('change', this.render, this);
    this.model.on('add:tasks', this.addTaskListItem, this);
  },

  render: function() {
    // console.log(this.tasks);
    this.$el.html(this.template({
      name: this.model.escape('name')
    }));
    return this;
  },

  addOne: function(board) {
    var boardView = new Failboat.Views.Board({model: board});
    $('#boards').append(boardView.render().el);
  },

  addTaskListItem: function(task) {
    var taskListItem = new Failboat.Views.Task({model: task});
    if(task.isFinished()) {
      $('#finished').append(taskListItem.render().el);
    } else {
      $('#tasks').append(taskListItem.render().el);
    }
    return this;
  },

  recreateTaskListItem: function(task) {
    console.log('recreate');
  },

  createTask: function(event) {
    event.preventDefault();
    var board_id = this.model.get('id');
    var newTask = new Failboat.Models.Task({
      name: $('#new_task_name').val(), 
      done: false, 
      board_id: board_id
    });
    newTask.save({}, {
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
