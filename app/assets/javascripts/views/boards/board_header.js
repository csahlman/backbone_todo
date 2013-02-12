Failboat.Views.BoardHeaderView = Backbone.View.extend({

  tagName: 'span',

  id: 'header_span',

  template: JST['boards/actions'],

  events: {
    'click #edit_name_button': 'editName',
    'click #edit_users': 'editUsers',
    'submit #edit_board_name_form': 'updateName',
    'click #delete_board': 'deleteBoard'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('change:name', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    var name = this.model.get('name');
    this.$el.html(this.template({name: name}));
    return this;
  },

  editName: function(event) {
    event.preventDefault();
    $('#name').replaceWith(JST['boards/name_form']({name: this.model.get('name')}));
    $('#edit_board_name').focus();
    $('#edit_name_button').remove();
  },

  updateName: function(event) {
    event.preventDefault();
    var name = $('#edit_board_name').val().trim();
    if(this.model.get('name') === name || name.trim() === '') {
      this.model.trigger('change:name');
      return false;
    } else {
      this.model.set({name: name});
      this.model.save({}, {
        wait: true,
        success: function() {
          console.log('success');
        },
        error: function() {
          console.log('error updating name');
        }
      });
    }
  }, 

  deleteBoard: function(event) {
    event.preventDefault();
    var confirmation = confirm('Are you sure you want to delete this board?');
    if(confirmation) this.model.destroy();
  },

  editUsers: function() {
    console.log('all');
  }

});