Failboat.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',

  initialize: function() {
    this.on("change:tasks", this.parseTasks);
    this.parseTasks();
  },

  parseTasks: function() {
    this.tasks = new Failboat.Collections.Tasks(this.get('tasks'));
    console.log('parseTasks');
  }


});
