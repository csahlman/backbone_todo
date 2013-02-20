Failboat.Models.Task = Backbone.Model.extend({
  urlRoot: '/tasks',

  defaults: {
    name: "default", 
    done: "false"
  },

  validate: function(attributes) {
    // attributes hash only contains changed attributes, so extend it to include current ones as well
    mergedAttributes = _.extend(_.clone(this.attributes), attributes);
    if(!mergedAttributes.name  || mergedAttributes.name.trim() === "") {
      return "Task name must be present.";
    }
  },

  initialize: function() {
    this.on('change:comments', this.parseComments, this);
    this.on('change:users', this.parseUsers, this);
    this.parseUsers();
    this.parseComments();
  },

  parseComments: function() {
    this.comments = new Failboat.Collections.Comments(this.get('comments'));
    // console.log('parseComments');
  },

  parseUsers: function() {
    this.users = new Failboat.Collections.Users(this.get('users'));
  },

  toggle: function() {
    this.save({
      done: !this.get('done')
    });
    this.trigger('change');
  },

  isFinished: function() {
    return (this.get('done') === true);
  },

  anyComments: function() {
    return (this.get('comments').length > 0);
  }

});
