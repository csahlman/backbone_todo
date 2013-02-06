Failboat.Views.Signup = Backbone.View.extend({
  template: JST['users/signup'],

  events: {
    'submit form': 'signup'
  },

  initialize: function() {
    this.model = new Failboat.Models.UserRegistration();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  // onRender: function() {
  //   this.modelBinder.bind(this.model, this.el);
  // },

  signup: function(event) {

    event.preventDefault();

    email = $('#email').val().trim();
    password = $('#password').val();
    password_confirmation = $('#password_confirmation').val();


    // el.find('input.btn-primary').button('loading');
    // el.find('.alert-error').remove();
    // el.find('.help-block').remove();
    // el.find('.control-group.error').removeClass('error');

    this.model.save(
      { email: email, 
        password: password, 
        password_confirmation: password_confirmation,
        remember_me: true
      }, {
      success: function(userSession, response) {
        // el.find('input.btn-primary').button('reset');
        Failboat.currentUser = new Failboat.Models.User(response);
        router = new Failboat.Routers.Tasks()
        router.navigate('', true);
      },
      error: function(userSession, response) {
        // var result = $.parseJSON(response.responseText);
        // el.find('form').prepend(BD.Helpers.Notifications.error("Unable to complete signup."));
        // _(result.errors).each(function(errors,field) {
        //   $('#'+field+'_group').addClass('error');
        //   _(errors).each(function(error, i) {
        //     $('#'+field+'_group .controls').append(BD.Helpers.FormHelpers.fieldHelp(error));
        //   });
        // });
        // el.find('input.btn-primary').button('reset');
        console.log('error');
        console.log(userSession);
        console.log(response);
      }
    });
  }


});