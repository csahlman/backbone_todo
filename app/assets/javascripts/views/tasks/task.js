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
    this.model.on('reset', this.render, this);
    this.model.on('change:done', this.addToCorrectList, this);
    this.model.on('change:name', this.render, this);
    this.model.on('change:id', this.render, this);
  },

  render: function() {
    var board_id = this.model.get('board_id').get('id'),
        id = this.model.id,
        name = this.model.escape('name');
    this.$el.html(this.template({
      board_id: board_id,
      id: id,
      name: name
    }));
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
      $li.appendTo('#finished');
      $li.addClass('finished');
    } else {
      $li.appendTo('#tasks');
      $li.removeClass('finished');
    }
    // return this;
  },

  removeItem: function(event) {
    event.preventDefault();
    this.model.destroy();
  }

});