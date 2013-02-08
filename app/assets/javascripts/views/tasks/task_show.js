Failboat.Views.TaskShow = Backbone.View.extend({
  id: 'sidebar',

  template: JST['tasks/show'],

  model: Failboat.Models.Task,

  events: {
    'dblclick #name_header': 'renderNameForm',
    'click .edit': 'renderForm',
    'submit #edit_description_form': 'editDescription',
    'submit #edit_name_form': 'editName',
    // 'blur #edit_name_form': 'closeNameForm',
    'click .toggle': 'toggleDone',
    'submit #new_comment_form': 'createComment',
    'click #load_comments': 'loadComments'
  },

  initialize: function() {
    console.log('in the initialize tasks show');
    this.model.fetch();
    _.bindAll(this, 'render');
    // this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.model.on('change', this.render, this);
    this.model.on('reset', this.render, this);
    this.model.on('add:comments', this.renderComment, this);
  },

  render: function() {
    // console.log(this.model.get('models').length);
    $(this.el).html(this.template({task: this.model}));
    if($('#comments').html() === undefined || $('#comments').html().match(/^\s*$/)) {
      var comments = this.model.get('comments').models;
      $.each(comments, function(index, comment){
        var commentView = new Failboat.Views.Comment({model: comment});
        $('#comments').append(commentView.render().el);        
      });
    }    
    return this;
  },

  loadComments: function(e) {
    e.preventDefault();
    this.model.trigger('change');
  },

  renderComment: function(comment) {
    var commentView = new Failboat.Views.Comment({model: comment});
    var $html = commentView.render().el;
    $('#comments').append($html);
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