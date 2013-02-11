Failboat.Views.Task = Backbone.View.extend({
  tagName: 'li', 

  template: JST['tasks/task'],

  model: Failboat.Models.Task,

  events: {
    'click .toggle': 'toggleDone',
    'change :checkbox': 'removeItem'
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.$el.html(this.template({
      board_id: this.model.get('board'),
      id: this.model.get('id'),
      name: this.model.escape('name')
    }));
    // this.addToCorrectList();
    return this;
  },

  toggleDone: function(event) {
    event.preventDefault();
    this.model.toggle();
  },


  // addToCorrectList: function() {
  //   $li = this.$el;
  //   if(this.model.isFinished()) {
  //     $li.appendTo('#finished');
  //     $li.addClass('finished');
  //   } else {
  //     $li.appendTo('tasks');
  //     $li.removeClass('finished');
  //   }
  //   // return this;
  // },

  removeItem: function(event) {
    event.preventDefault();
    this.model.destroy();
  }

});