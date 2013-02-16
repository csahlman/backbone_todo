Failboat.Views.Task = Backbone.Marionette.ItemView.extend({
  tagName: 'li', 

  template: JST['tasks/task'],

  model: Failboat.Models.Task,

  events: {
    'click .toggle': 'toggleDone',
    'click .delete_button': 'removeItem'
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change:done', this.addToCorrectList);
  },

  render: function() {
    var board_id = this.model.get('board_id'),
        id = this.model.id,
        name = this.model.escape('name'),
        description = this.model.escape('description'),
        finished = this.model.get('done');

    this.$el.html(this.template({
      board_id: board_id,
      id: id,
      name: name,
      description: description,
      finished: finished
    }));
    this.addToCorrectList();
    return this;
  },

  toggleDone: function(event) {
    event.preventDefault();
    this.model.toggle();
  },


  addToCorrectList: function() {
    if(this.model.isFinished()) {
      this.$el.appendTo('#finished');
      this.$('.link_list').addClass('finished');
      this.$('.toggle').text("Mark As Unfinished");
    } else {
      this.$el.appendTo('#tasks');
      this.$('.link_list').removeClass('finished');
      this.$('.toggle').text("Mark As Finished");
    }
  },

  removeItem: function(event) {
    event.preventDefault();
    var confirmation = confirm('Are you sure?');
    if(confirmation) this.model.destroy();
  }

});