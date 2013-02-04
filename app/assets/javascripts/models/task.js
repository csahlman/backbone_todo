Failboat.Models.Task = Backbone.Model.extend({
  urlRoot: '/tasks',

  defaults: {
    name: "default", 
    done: "false"
  },

  change: function() {
    console.log('here we go');
    this.trigger('change');
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
