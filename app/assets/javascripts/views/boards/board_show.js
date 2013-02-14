Failboat.Views.BoardShow = Support.CompositeView.extend({
  tagName: 'span',

  id: 'board_show',

  template: JST['boards/show_board'],

  events: {
    'submit #new_task': 'createTask',
    'click #delete_board': 'deleteBoard',
    'click #edit_name_button': 'editName',
    'click #edit_users': 'editUsers',
    'submit #edit_board_name_form': 'updateName'
  },

  initialize: function() {
    _.bindAll(this, 'render','addOne', 'addAll', 'createTask');
    this.model.on('change', this.render, this);
    this.model.on('change:name', this.render, this);   
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    console.log('board show render');
    var name = this.model.escape('name'),
        tasks = this.model.tasks;
    this.$el.empty().html(this.template({
      name: this.model.escape('name')
    }));
    if(tasks.length > 0 && (this.$('#finished').html().trim() === '') && (this.$('#tasks').html().trim() === '')) {
      this.addAll();
      // if we rerender and it doesn't change the add:tasks, manually readd them
    }
    return this;
  },

  addAll: function() {
    this._leaveChildren();
    var tasks = this.model.tasks;
    tasks.each(this.addOne);
  },

  addOne: function(task) {
    var taskListItemView = new Failboat.Views.Task({model: task});
    var container;
    if(task.isFinished()) {
      container = this.$('#finished');
    } else {
      container = this.$('#tasks');
    }
    this.appendChildTo(taskListItemView, container);
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
        self.model.trigger('change');
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
