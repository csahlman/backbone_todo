Failboat.Models.Board = Backbone.Model.extend({
  urlRoot: '/boards',

  initialize: function(options) {
    this.on("change:tasks", this.parseTasks);
    this.on("change:users", this.parseUsers);
    this.tasks = new Failboat.Collections.Tasks();
    this.users = new Failboat.Collections.Users([], {
      board_id: this.id
    });
    this.users.fetch();
    this.parseUsers();
    this.parseTasks();
  },

  toJSON: function() {
    var json = _.clone(this.attributes);

    json.userAttributes = this.users.map(function(user) {
      return { user_id: user.id };
    });

    return json;
  },

  parseUsers: function() {
    this.users.reset(this.get('users'));
  },

  parseTasks: function() {
    this.tasks.reset(this.get('tasks'));
  }


});
