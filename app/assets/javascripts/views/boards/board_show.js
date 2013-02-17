Failboat.Views.BoardShow = Backbone.Marionette.Layout.extend({

  template: JST['boards/show_board'],

  regions: {
    list: '#list',
    users: '#users'
  },

  events: {
    'submit #new_task': 'createTask',
    'click #delete_board': 'deleteBoard',
    'click #edit_name_button': 'editName',
    'click #edit_users': 'editUsers',
    'submit #edit_board_name_form': 'updateName'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'createTask');
    this.model.on('destroy', this.remove, this);
    this.model.on('change:name', this.renderName, this);
  },

  render: function() {
    var name = this.model.escape('name');
    this.$el.html(this.template({
      name: this.model.escape('name')
    }));
    return this;
  },

  deleteBoard: function(event) {
    event.preventDefault();
    var confirmation = confirm('Are you sure you want to delete this board?');
    if(confirmation) this.model.destroy();
  },

  createTask: function(event) {
    event.preventDefault();
    var self = this;
    var board_id = this.model.get('id');
    this.model.tasks.create({
      name: $('#new_task_name').val(), 
      done: false,
      board_id: board_id
    },{
      wait: true,
      success: function() {
        $('#new_task')[0].reset();
        self.model.trigger('change:name');
      },
      error: function() {
        alert('error');
      }
    });
  },

  renderName: function() {
    console.log('in renderName');
    this.$('#board_name').html(this.model.escape('name'));
  },

  editName: function(event) {
    event.preventDefault();
    this.$('#board_name').html(JST['boards/name_form']({name: this.model.get('name')}));
    $('#edit_board_name').focus();
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

  editUsers: function() {
    console.log('all');
  }


});
