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
    
  },

  toggle: function() {
    this.save({
      done: !this.get('done')
    });
  },

  isFinished: function() {
    return (this.get('done') === true);
  }

});
