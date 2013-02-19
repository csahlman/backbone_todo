Failboat.Views.Board = Backbone.Marionette.ItemView.extend({
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
    var board_id = this.model.get('id');
    var board_admin = this.model.get('current_user_admin');
    var name = this.model.escape('name');
    this.$el.html(this.template({
      name: name, 
      board_admin: board_admin,
      board_id: board_id
    }));
    return this;
  },


  deleteBoard: function(event) {
    event.preventDefault();
    var confirmation = confirm("Are you sure?");
    if(confirmation) this.model.destroy();
  }

});