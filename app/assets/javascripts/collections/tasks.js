Failboat.Collections.Tasks = Backbone.Collection.extend({
  model: Failboat.Models.Task,
  url: '/boards/',

  initialize: function() {
    this.on('add', this.logOut, this);
  },

  logOut: function() {
    console.log('change event');
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
