Failboat.Views.Info = Backbone.View.extend({

  template: JST['utilities/info'],

  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});