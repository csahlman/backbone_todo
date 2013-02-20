Failboat.Views.TaskShow = Backbone.Marionette.Layout.extend({

  template: JST['tasks/show_task'],

  // model: Failboat.Models.Task,

  regions: {
    comments: '#comments',
    users: '#user_div'
  },

  events: {
    'click #edit_name_button': 'renderNameForm',
    'click .edit': 'renderForm',
    'submit #edit_description_form': 'editDescription',
    'submit #edit_name_form': 'editName',
    // 'blur #edit_name_form': 'closeNameForm',
    'click #toggle': 'toggleDone',
    'submit #add_comment': 'createComment'  
  },

  initialize: function() {
    _.bindAll(this, 'render', 'renderComment', 'createComment');
    this.model.on('destroy', this.remove, this);
    this.model.on('change:description', this.renderDescription, this);
    this.model.on('change:name', this.renderName, this);
    this.model.on('change:done', this.renderDone, this)
  },

  render: function() {
    var board_id = this.model.get('board_id')
    this.$el.html(this.template({
      name: this.model.escape('name'),
      description: this.model.escape('description'),
      done: this.model.get('done'),
      board_id: board_id
    })); 
    return this;
  },

  renderDescription: function(task) {
    $('#description').html(this.model.escape('description'));
  },

  renderName: function(task) {
    var name = task.escape('name');
    $('#task_div h5').html(name);
    $('#task_name').html(name);
    if(task.get('done')) {
      this.$('#name').html(name + ' (Marked As Finished)');
    } else {
      this.$('#name').html(name + ' (Not Done)');
    }
    
  },

  renderDone: function() {
    var name = this.model.escape('name');
    if(this.model.isFinished()) {
      $('#toggle').html('Mark As Unfinished');
      $('#name').html(name + ' (Marked As Finished)');
    } else {
      $('#toggle').html('Mark As Finished');
      $('#name').html(name + ' (Not Done)');
    }
    
  },

  renderComment: function(comment) {
    console.log('rendering comment');
    var commentView = new Failboat.Views.Comment({model: comment});
    var container = this.$('#comments');
    container.append(commentView.render().el);
  },

  renderForm: function(event) {
    event.preventDefault();
    $('#description').html(JST['tasks/edit_description_form']({task: this.model}));
  },

  renderNameForm: function(event) {
    event.preventDefault();
    $('#name').html(JST['tasks/edit_name_form']({task: this.model}));
    $('#name').focus();
  },

  editDescription: function(event) {
    event.preventDefault();
    var description = $('#edit_task_description').val();
    if(description === this.model.get('description')) {
      this.model.trigger('change:description');
    }
    else {
      this.model.save({description: description}, { 
        error: function(model, error) {
          console.log(error);
        }
      }); 
    }
  },

  handleError: function(entry, response) {
    var errors = $.parseJSON(response.responseText).errors
    alert(errors); 
  },

  editName: function(event) {
    event.preventDefault();
    var name = $('#edit_task_name').val().trim();
    if(name === this.model.get('name')) {
      this.renderName(this.model);
    }
    else {
      this.model.save({name: name}, {
        error: function(model, error) {
          console.log(error);
        }
      });
    }
  },

  toggleDone: function(event) {
    event.preventDefault();
    this.model.toggle();
  },

  createComment: function(event) {
    event.preventDefault();
    var content = $('#new_comment').val();
    var self = this;
    this.model.comments.create({
      task_id: this.model.get('id'), 
      content: content
    },{
      wait: true,
      success: function() {
        $('#new_comment').val('');
        self.model.trigger('change');
      },
      error: function() {
        console.log('error creating comment');
      }
    });
  }


});