Failboat.Views.User = Backbone.Marionette.ItemView.extend({
  tagName: 'li',

  className: 'online',

  template: JST['users/show_user'],

  events: {
    // 'click .delete_button': 'destroyComment'
  },

  initialize: function() {
    // this.model.on('change', this.render, this);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    this.$el.html(this.template({
      email: this.model.escape('email'),
      id: this.model.get('id')
    }));
    return this;
  }
  
  // destroyComment: function(event) {
  //   event.preventDefault();
  //   var confirmation = confirm("Are you sure?");
  //   if(confirmation) this.model.destroy();
  // }

});
