Failboat.Views.TaskShow = Backbone.View.extend({
  id: 'sidebar',

  template: JST['tasks/show'],

  model: Failboat.Models.Task,

  events: {
    'dblclick #name_header': 'renderNameForm',
    'click .edit': 'renderForm',
    'submit #edit_description_form': 'editDescription',
    'submit #edit_name_form': 'editName',
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
  },

  editDescription: function(event) {
    event.preventDefault();
    // this.model.set({'description': $('#edit_task_description').val()});
    this.model.save({'description': $('#edit_task_description').val()}); 
    // {
    //   wait: true
    //   // success: function() {
    //   //   $('#edit_description_form').remove();
    //   // },
    //   // error: function() {
    //   //   console.log('in the error hander');
    //   //   this.handleError();
    //   // }
    // });
  },

  handleError: function(entry, response) {
    errors = $.parseJSON(response.responseText).errors
    alert(errors); 
  },

  editName: function(event) {
    event.preventDefault();
    this.model.save({'name': $('#edit_task_name').val()});
    // this.model.save({
    //   wait: true
    //   // success: function() {
    //   //   $('#edit_name_form').remove();
    //   // },
    //   // error: function() {
    //   //   console.log('in the error hander');
    //   //   this.handleError();
    //   // }
    // });
  },

  toggleDone: function(event) {
    event.preventDefault();
    this.model.toggle();
  }

});