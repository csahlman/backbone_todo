Failboat.Views.BoardShow = Backbone.Marionette.Layout.extend({

  template: JST['boards/show_board'],

  regions: {
    list: '#list'
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
    // this.model.on('reset', this.render, this);
    // this.model.on('change', this.render, this);
    // this.model.on('change:name', this.render, this);   
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    var name = this.model.escape('name');
    this.$el.html(this.template({
      name: this.model.escape('name')
    }));
    return this;
  },


  addOne: function(task) {
    // console.log('in addOne');
    // var taskListItem = new Failboat.Views.Task({model: task});
    // if(task.isFinished()) {
    //   this.finished.show(taskListItem.render().el);
    // } else {
    //   $(this.tasks).append(taskListItem.render().el);
    // }
  },

  addToCorrectList: function(li, task) {
    // if(task.isFinished()) {
    //   this.$('#finished').append($(li));
    //   $(li).addClass('finished');
    //   // this.$('.toggle').text("Mark As Unfinished");
    // } else {
    //   this.$('#tasks').append($(li));
    //   $(li).removeClass('finished');
    //   // this.$('.toggle').text("Mark As Finished");
    // }
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
        // self.model.trigger('change');
      },
      error: function() {
        alert('error');
      }
    });
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

  editUsers: function() {
    console.log('all');
  }


});
