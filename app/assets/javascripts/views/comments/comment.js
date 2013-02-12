Failboat.Views.Comment = Backbone.View.extend({
  tagName: 'li',

  template: JST['comments/show'],

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('remove', this.render, this);
  },

  render: function() {
    this.$el.html(this.template({
      poster_name: this.model.escape('poster_name'),
      content: this.model.escape('content'),
      created_at: this.model.get('created_at')
    }));
    return this;
  }

});
