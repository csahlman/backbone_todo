Failboat.Collections.Tasks = Backbone.Collection.extend({
  model: Failboat.Models.Task,
  url: '/tasks',

  completed: function() {
    return this.filter(function(task){
      return task.get('done');
    });
  },

  remainingTasks: function() {
    return this.without.apply(this, this.completed());
  }
});
