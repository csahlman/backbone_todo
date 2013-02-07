Failboat.Views.Comment = Backbone.View.extend({
  tagName: 'li',

  className: 'comment',

  template: JST['comments/show'],

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('remove', this.render, this);
  },

  render: function() {
    this.$el.html(this.template({comment: this.model}));
    return this;
  }

});
