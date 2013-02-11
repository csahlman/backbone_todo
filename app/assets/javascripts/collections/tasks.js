Failboat.Collections.Tasks = Backbone.Collection.extend({
  model: Failboat.Models.Task,
  url: '/boards',

  initialize: function() {
    // this.on('add', this.logOut, this);
  },

  completed: function() {
    return this.filter(function(task){
      return task.get('done');
    });
  },

  remainingTasks: function() {
    return this.without.apply(this, this.completed());
  }
});
