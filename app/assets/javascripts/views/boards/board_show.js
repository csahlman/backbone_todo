Failboat.Views.BoardShow = Backbone.View.extend({

  template: JST['boards/show_board'],

  events: {
    
  },

  initialize: function() {
    this.collection.on('change', this.render, this);
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.addTaskListItem, this);
    this.model.on('reset', this.render, this);
    this.model.on('change', this.render, this);
    this.model.on('add:tasks', this.addTaskListItem, this);
  },

  render: function() {
    console.log(this.collection.models);
    this.$el.html(this.template({board: this.model}));
    return this;
  },

  addOne: function(board) {
    var boardView = new Failboat.Views.Board({model: board});
    $('#boards').append(boardView.render().el);
  },

  createBoard: function(event) {
    event.preventDefault();
    this.collection.create({
      name: $('#new_board_name').val()
    });
  },

  addTaskListItem: function(task) {
    var taskListItem = new Failboat.Views.Task({model: task});
    if(task.isFinished()) {
      $('#finished').append(taskListItem.render().el);
    } else {
      $('#tasks').append(taskListItem.render().el);
    }
  }



});
