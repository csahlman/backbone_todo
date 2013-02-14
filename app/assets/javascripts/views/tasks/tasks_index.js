Failboat.Views.TasksIndex = Backbone.Marionette.CollectionView.extend({
  tagName: 'span',

  id: 'fail',

  itemView: Failboat.Views.Task,

  // model: Failboat.Models.Task,

  template: JST['tasks/index'],

  events: {
    // 'submit #new_task': 'createNewTask'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'addToCorrectList', 'addOne');
    // this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'change', this.render);
  },

  render: function() {
    console.log('render function');
    $(this.el).html(this.template());
    var self = this;
    this.collection.each(this.addOne);
    return this;
  },

  addOne: function(task) {
    var taskListItem = new Failboat.Views.Task({model: task});
    if(task.isFinished()) {
      this.$('#finished').append(taskListItem.render().el);
    } else {
      this.$('#tasks').append(taskListItem.render().el);
    }
    // this.addToCorrectList(taskListItem, task);
  },

  addToCorrectList: function(li, task) {
    if(task.isFinished()) {
      this.$('#finished').append($(li));
      $(li).addClass('finished');
      // this.$('.toggle').text("Mark As Unfinished");
    } else {
      this.$('#tasks').append($(li));
      $(li).removeClass('finished');
      // this.$('.toggle').text("Mark As Finished");
    }
  }


});
