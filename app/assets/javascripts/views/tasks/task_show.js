Failboat.Views.TaskShow = Backbone.View.extend({
  id: 'right-span',

  className: 'span6',

  template: JST['tasks/show'],

  model: Failboat.Models.Task,

  events: {
    'dblclick #name_header': 'renderNameForm',
    'click .edit': 'renderForm',
    'submit #edit_description_form': 'editDescription',
    'submit #edit_name_form': 'editName',
    // 'blur #edit_name_form': 'closeNameForm',
    'click .toggle': 'toggleDone',
    'submit #new_comment_form': 'createComment'  
  },

  initialize: function() {
    this.model.fetchRelated();
    this.model.on('destroy', this.remove, this);
    this.model.on('change:description', this.render, this);
    this.model.on('change:name', this.render, this);
    this.model.on('change:done', this.render, this);
    this.model.on('reset', this.render, this);
    this.model.on('add:comments', this.renderComment, this);
  },

  render: function() {
    console.log('in the task show render');
    $(this.el).html(this.template({task: this.model}));
    // if($('#comments').html() === undefined || $('#comments').html().match(/^\s*$/)) {
    var comments = this.model.get('comments');
    comments.each(this.renderComment);
    // }    
    return this;
  },

  renderComment: function(comment) {
    var commentView = new Failboat.Views.Comment({model: comment});
    $('#comments').append(commentView.render().el);
  },

  renderForm: function(event) {
    event.preventDefault();
    $('#edit_description').html(JST['tasks/edit_description_form']({task: this.model}));
  },

  renderNameForm: function() {
    $('#name_header').html(JST['tasks/edit_name_form']({task: this.model}));
    $('#name_header').focus();
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
      this.model.trigger('change');
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
    var content = $('#new_comment_content').val();
    var comment = new Failboat.Models.Comment({task_id: this.model.get('id'), content: content});
    comment.save({}, {
      success: function() {
        $('#new_comment_content').val('');
      },
      error: function() {
        console.log('error creating comment');
      }
    });
  }


});