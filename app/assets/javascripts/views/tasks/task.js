Failboat.Views.Task = Backbone.View.extend({
  tagName: 'li', 

  template: JST['tasks/task'],

  model: Failboat.Models.Task,

  events: {
    'click .toggle': 'toggleDone',
    'change :checkbox': 'removeItem'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    $(this.el).html(this.template({task: this.model}));
    this.addToCorrectList();
    return this;
  },

  toggleDone: function(event) {
    event.preventDefault();
    this.model.toggle();
  },


  addToCorrectList: function() {
    $li = this.$el;
    if(this.model.isFinished()) {
      $li.addClass('finished');
      $li.appendTo('#finished');
    } else {
      $li.removeClass('finished');
      $li.appendTo('#tasks');
    }
    return this;
  },

  removeItem: function(event) {
    event.preventDefault();
    this.model.destroy();
  }

});