Failboat.Views.Board = Backbone.View.extend({
  tagName: 'li',

  template: JST['boards/show'],

  events: {
    'click .delete_button': 'deleteBoard'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('reset', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    return this;
  },

  deleteBoard: function(event) {
    event.preventDefault();
    var confirmation = confirm("Are you sure?");
    if(confirmation) this.model.destroy();
  }

});