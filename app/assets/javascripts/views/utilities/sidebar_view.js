Failboat.Views.Sidebar = Backbone.View.extend({
  tagName: 'span',

  template: JST['utilities/controls'],

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    this.$el.html(this.template({
      email: this.model.get('email'),
    }));
    return this;
  }

});