Failboat.Views.Board = Backbone.View.extend({
  tagName: 'li',

  template: JST['boards/show'],

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('reset', this.render, this);
  },

  render: function() {
    this.$el.html(this.template({board: this.model}));
    return this;
  }
});