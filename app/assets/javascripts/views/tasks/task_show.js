Failboat.Views.TaskShow = Backbone.View.extend({
  tagName: 'span',

  id: 'task_show',

  template: JST['tasks/show_task'],

  model: Failboat.Models.Task,

  events: {
    'click #edit_name_button': 'renderNameForm',
    'click .edit': 'renderForm',
    'submit #edit_description_form': 'editDescription',
    'submit #edit_name_form': 'editName',
    // 'blur #edit_name_form': 'closeNameForm',
    'click .toggle': 'toggleDone',
    'submit #add_comment': 'createComment'  
  },

  initialize: function() {
    this.model.fetchRelated();
    this.model.on('destroy', this.remove, this);
    this.model.on('change:description', this.render, this);
    this.model.on('change:name', this.render, this);
    this.model.on('change:done', this.render, this);
    this.model.on('reset', this.render, this);
    this.model.on('add:comments', this.render, this);
  },

  render: function() {
    var comments = this.model.get('comments');
    var board_id = this.model.get('board')
    console.log(this.model.get('board'));
    this.$el.html(this.template({
      name: this.model.escape('name'),
      description: this.model.escape('description'),
      done: this.model.get('done'),
      board_id: board_id
    }));
    comments.each(this.renderComment);
    return this;
  },

  renderComment: function(comment) {
    var commentView = new Failboat.Views.Comment({model: comment});
    $('#comments').prepend(commentView.render().el);
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
      this.model.trigger('change');
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
      this.model.trigger('change:name');
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
    console.log('creating comment');
    event.preventDefault();
    var content = $('#new_comment').val();
    var comment = new Failboat.Models.Comment({task_id: this.model.get('id'), content: content});
    comment.save({}, {
      wait: true,
      success: function() {
        $('#new_comment').val('');
      },
      error: function() {
        console.log('error creating comment');
      }
    });
  }


});