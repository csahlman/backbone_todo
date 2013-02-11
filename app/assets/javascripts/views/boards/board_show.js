Failboat.Views.BoardShow = Backbone.View.extend({
  tagName: 'div',

  id: 'left',

  className: "span6", 

  template: JST['boards/show_board'],

  events: {
    'submit #new_task': 'createTask'
  },

  initialize: function() {
    this.model.fetch();
    this.model.on('reset', this.addAll, this);
    this.model.on('add:tasks', this.addOne, this);
    this.model.on('change:tasks:done', this.addAll, this);
    this.model.on('change:tasks:name', this.render, this);    
  },

  render: function() {
    this.$el.html(this.template({
      name: this.model.escape('name')
    }));
    return this;
  },

  addAll: function() {
    console.log('hitting addAll');
    this.model.get('tasks').each(this.addOne);
  },

  addOne: function(task) {
    var taskListItemView = new Failboat.Views.Task({model: task});
    if(task.isFinished()) {
      this.$('#finished').append(taskListItemView.render().el);
    } else {
      this.$('#tasks').append(taskListItemView.render().el);
    }
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
