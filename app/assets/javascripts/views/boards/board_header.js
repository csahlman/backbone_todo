Failboat.Views.BoardHeaderView = Backbone.View.extend({

  tagName: 'span',

  id: 'header_span',

  template: JST['boards/actions'],

  events: {
    'click #edit_name_button': 'editName',
    'click #edit_users': 'editUsers'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function() {
    var name = this.model.get('name');
    this.$el.html(this.template({name: name}));
    return this;
  },

  editName: function(event) {
    event.preventDefault();
    $('#name').replaceWith(JST['boards/name_form']({name: this.model.get('name')}));
  },

  updateName: function() {
    // $('')
  }, 

  editUsers: function() {
    console.log('all');
  }

});