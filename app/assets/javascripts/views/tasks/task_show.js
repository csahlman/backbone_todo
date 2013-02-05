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
    'click .toggle': 'toggleDone'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    // this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.model.on('change', this.render, this);
  },

  render: function() {
    $(this.el).html(this.template({task: this.model}));
    return this;
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
    description = $('#edit_task_description').val();
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
    errors = $.parseJSON(response.responseText).errors
    alert(errors); 
  },

  editName: function(event) {
    event.preventDefault();
    name = $('#edit_task_name').val().trim();
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
  }

});